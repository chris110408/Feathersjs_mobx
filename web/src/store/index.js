import React, { createContext } from "react";

import GlobalStore from "./globalStore";

const GobalStoreContext = createContext();

const GlobalStoreProvider = ({ children }) => {
  return (
    <GobalStoreContext.Provider value={GlobalStore}>
      {children}
    </GobalStoreContext.Provider>
  );
};

export { GlobalStoreProvider, GobalStoreContext };
