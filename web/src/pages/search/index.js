import React, { useContext, useEffect, useState } from "react";
import { GobalStoreContext } from "../../store";
import { observer } from "mobx-react";
import * as _ from "lodash/fp";

import { Card } from "antd";
import {
  Form,
  FormContent,
  Box,
  Flex,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  Text
} from "grey-vest";
import { SearchContext } from "./local-store";
import {
  _Command,
  extraCommand,
  beforeAndAfter
} from "../../utils/extend-futil";
import { extendObservable } from "mobx";
import { CommandButton, FormField } from "../../components";
import { SearchRestaurantForm } from "./components/raw-form";

import "antd/dist/antd.css";
import RestaurantsTable from "./restaurants-table";
import { RestaurantForm } from "../restauarants/components/raw-form";
import { searchRestaurantsList } from "../../services/restaurants";

const BeforeAndAfterCommand = extraCommand(_Command, beforeAndAfter, x => y =>
  extendObservable(y, x)
);
const Search = ({}) => {
  const globalStore = useContext(GobalStoreContext);
  const localStore = useContext(SearchContext);
  const [restaurantData, setRestaurantData] = useState(localStore.restaurants);
  const { token } = globalStore;
  const fetchRestaurantsCommand = {
    mainFn: BeforeAndAfterCommand(async () => {
      try {
        const res = await localStore.fetchRestaurantsEffect(token);
        return { arg: res.data };
      } catch (e) {
        throw e;
      }
    }),
    arg: {
      afterFn: async arg => {
        setRestaurantData(arg);
      }
    }
  };

  useEffect(() => {
    const { mainFn, arg } = fetchRestaurantsCommand;
    mainFn(arg);
  }, []);

  const {
    restaurants,
    isSearchModalVisible,
    isUpdateModalVisible,
    loading,
    setSearchModalVisible
  } = localStore;

  const showModalCommand = {
    mainFn: BeforeAndAfterCommand(async () => {
      setSearchModalVisible(true);
    }),
    arg: {}
  };
  const searchCommand = {
    mainFn: BeforeAndAfterCommand(async () => {
      const form = await SearchRestaurantForm.submit();
      if (form) {
        const fields = form.getSnapshot();
        const res = await searchRestaurantsList({ ...fields }, token);
        return { arg: res.data };
      } else {
        throw {};
      }
    }),
    arg: {
      afterFn: async arg => {
        setSearchModalVisible(false);
        _.isEmpty(arg) || setRestaurantData(arg);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "red !important" }}>
      <Card style={{ marginRight: "50px" }} loading={loading}>
        <CommandButton
          command={showModalCommand.mainFn}
          arg={showModalCommand.arg}
          style={{ width: "100%", margin: "20px auto" }}
        >
          Search Restaurant
        </CommandButton>
        <RestaurantsTable restaurantData={restaurantData} />
      </Card>

      <Modal isOpen={isSearchModalVisible}>
        <ModalHeader>Search</ModalHeader>
        <ModalContent>
          <Form as={Box} className='form-mainFn'>
            <Flex justifyContent='center'>
              <h1 className='form-header'>Restaurant Info</h1>
            </Flex>
            <FormContent columns={2}>
              <FormField field={SearchRestaurantForm.fields.name} width={2} />
              <FormField
                field={SearchRestaurantForm.fields.address}
                width={2}
              />
              <FormField field={SearchRestaurantForm.fields.star} width={2} />
              <FormField field={SearchRestaurantForm.fields.type} width={2} />
            </FormContent>
          </Form>
        </ModalContent>
        <ModalFooter>
          <Button
            onClick={() => {
              setSearchModalVisible(false);
            }}
          >
            cancel
          </Button>
          <CommandButton command={searchCommand.mainFn} arg={searchCommand.arg}>
            Search
          </CommandButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default observer(Search);
