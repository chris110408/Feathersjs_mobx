import {  useLocalStore } from 'mobx-react'
import {flow} from 'mobx';
import React from "react";
import {fetchRestaurantsList,createRestaurant,updateRestaurant,deleteRestaurant,searchRestaurantsList} from '../../../services/restaurants'



const SearchContext = React.createContext();

const SearchStoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    restaurants: [],
    isSearchModalVisible: false,
    loading: false,

    setSearchModalVisible: item => {
      store.isSearchModalVisible = item;
    },
    searchRestaurantsEffect: flow(function*(query, token) {
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
  }));

  return (
    <SearchContext.Provider value={store}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchStoreProvider, SearchContext };
