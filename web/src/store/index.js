import { useLocalStore } from "mobx-react";
import {toJS} from "mobx"
import React, { createContext } from "react";
import { requestAccountLogin } from "../services/login";
import _ from "lodash/fp";


import GlobalStore from './globalStore'


const GobalStoreContext = createContext();

const GlobalStoreProvider = ({ children }) => {

    return (
        <GobalStoreContext.Provider value={GlobalStore}>
            {children}
        </GobalStoreContext.Provider>
    );
};





export { GlobalStoreProvider, GobalStoreContext };

