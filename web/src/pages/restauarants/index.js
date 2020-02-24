import React, { useContext, useEffect } from "react";
import { GobalStoreContext } from "../../store";
import {  observer } from "mobx-react";
import * as _ from "lodash/fp";
import {  useHistory } from "react-router-dom";
import {Card} from 'antd'
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
import { RestaurantContext } from "./local-store";
import {
    _Command,
    extraCommand,
    doAfter,
    redirectSaveTokenCommand
} from "../../utils/extend-futil";
import { extendObservable, reaction, transaction } from "mobx";
import { CommandButton } from "../../components/command-button";
import FormField from "../../components/form-field";

import {RestaurantForm,SearchRestaurantForm} from "./components/raw-form";

import "antd/dist/antd.css";
import RestaurantsTable from "./restaurants-table";


let AfterCommand = fn =>
    extraCommand(_Command, doAfter(fn), x => y => extendObservable(y, x));

const Restauarants = ({}) => {
    const globalStore = useContext(GobalStoreContext);
    const localStore = useContext(RestaurantContext);
    // let open = userState(false)

    const { token } = globalStore;
    let history = useHistory();

    useEffect(() => {
        localStore.fetchRestaurantsEffect(token);
    }, []);

    const {
        restaurant,
        restaurants,
        isUpdateModalVisible,
        loading,
        setRestaurant,
        setrestaurants,
        setUpdateModalVisible,
        editRestaurantEffect,
        createRestaurantEffect
    } = localStore;

    const showModal = AfterCommand(() => {
        setRestaurant([]);
        setUpdateModalVisible(true);
    })(() => {
        setRestaurant({});
    });

    const updateValue = AfterCommand(res => {
        localStore.fetchRestaurantsEffect(token);
        setRestaurant({});
        _.each(i=>i.value=null)(RestaurantForm.fields)
    })(async () => {
        const form = await RestaurantForm.submit();
        if (form) {
            const fields = form.getSnapshot();
            const { type } = fields;
            fields.type = _.isObjectLike(type) ? type[0] : type;
            const _id = restaurant._id;
            console.log(_id);
            return _.isEmpty(_id)
                ? await createRestaurantEffect(fields, token)
                : await editRestaurantEffect({ _id, ...fields }, token);
        } else {
            throw { name: "form valid error", message: "please fix your mistake" };
        }
    });
    const showEditModal = async item => {
        setRestaurant(item);
        await AfterCommand(rawForm => {
            setUpdateModalVisible(true);
        })(() => {
            RestaurantForm.fields.name.value = item.name;
            RestaurantForm.fields.address.value = item.address;
            RestaurantForm.fields.star.value = item.star;
            RestaurantForm.fields.type.value = [item.type];
        })();
    };

    const deleteRecord =async id => {
        await AfterCommand(() => {
            localStore.fetchRestaurantsEffect(token);
        })((id) => {
            localStore.deleteRestaurantEffect(id,token);
        })(id);
    };





    return (
        <div style={{ backgroundColor: "red !important" }}>


            <Card style={{ marginRight: "50px" }}     loading={loading}>
                <CommandButton
                    command={showModal}
                    info={true}
                    style={{ width: "100%", margin: "20px auto" }}
                >
                    Creat Restaurant
                </CommandButton>
                <RestaurantsTable

                    // restaurants={_.isEmpty(restaurants) ? null : restaurants}
                    store={localStore}
                    deleteRecord={deleteRecord}
                    showEditModal={showEditModal}
                />
            </Card>

            <Modal
                isOpen={isUpdateModalVisible}
                onClose={() => {
                    setUpdateModalVisible(false);
                }}
            >
                <ModalHeader>{_.isEmpty(restaurant) ? "Create" : "Edit"}</ModalHeader>
                <ModalContent>
                    <Form as={Box} className='form-main'>
                        <Flex justifyContent='center'>
                            <h1 className='form-header'>Restaurant Info</h1>
                        </Flex>
                        <FormContent columns={2}>
                            <FormField field={RestaurantForm.fields.name} width={2} />
                            <FormField field={RestaurantForm.fields.address} width={2} />
                            <FormField field={RestaurantForm.fields.star} width={2} />
                            <FormField field={RestaurantForm.fields.type} width={2} />
                        </FormContent>
                    </Form>
                </ModalContent>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            setUpdateModalVisible(false);
                        }}
                    >
                        cancel
                    </Button>
                    <CommandButton command={updateValue}>Submit</CommandButton>
                </ModalFooter>
            </Modal>


        </div>
    );
};

export default observer(Restauarants);

