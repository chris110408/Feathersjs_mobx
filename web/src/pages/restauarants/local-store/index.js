import {  useLocalStore } from 'mobx-react'
import {flow} from 'mobx';
import React from "react";
import {fetchRestaurantsList,createRestaurant,updateRestaurant,deleteRestaurant,searchRestaurantsList} from '../../../services/restaurants'
import * as _ from "lodash/fp";


const RestaurantContext = React.createContext();

const RestaurantStoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    restaurant: {},
    restaurants: [],
    isUpdateModalVisible: false,
    isSearchModalVisible: false,
    loading: false,

    setRestaurant: item => {
      store.restaurant = item;
    },
    setSearchModalVisible: item => {
      store.isSearchModalVisible = item;
    },
    setUpdateModalVisible: item => {
      store.isUpdateModalVisible = item;
    },
    addRestaurant: item => {
      [item].concat(store.restaurants);
    },

    searcgRestaurantsEffect: flow(function*(query, token) {
      try {
        store.loading = true;
        const res = yield searchRestaurantsList(query, token);
        store.loading = false;
        return { res, store };
      } catch (e) {
        store.loading = false;
        throw e;
      }
    }),
    fetchRestaurantsEffect: flow(function*(token) {
      try {
        store.loading = true;
        const res = yield fetchRestaurantsList(token);
        store.loading = false;
        return res ;
      } catch (e) {
        store.loading = false;
        throw e;
      }
    }),
    editRestaurantEffect: flow(function*(payload, token) {
      try {
        store.loading = true;
        const res = yield updateRestaurant(
            _.assign({ strategy: "local" }, payload),
            token
        );
        store.isUpdateModalVisible = false;
        store.loading = false;
        return res;
      } catch (e) {
        store.loading = false;
        throw e;
      }
    }),
    createRestaurantEffect: flow(function*(payload, token) {
      try {
        store.loading = true;
        const res = yield createRestaurant(
            _.assign({ strategy: "local" }, payload),
            token
        );
        store.isUpdateModalVisible = false;
        store.loading = false;
        return { res, store };
      } catch (e) {
        store.loading = false;
        throw e;
      }
    }),
    deleteRestaurantEffect: flow(function*(payload, token) {
      try {
        store.loading = true;
        const res = yield deleteRestaurant(payload, token);
        store.loading = false;
        return { res, store };
      } catch (e) {
        store.loading = false;
        throw e;
      }
    })
  }));

  return (
    <RestaurantContext.Provider value={store}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantStoreProvider };
