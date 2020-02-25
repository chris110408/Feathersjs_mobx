import React from 'react';
import './App.css';
import {RestaurantStoreProvider} from './pages/restauarants/local-store'
import {SearchStoreProvider} from './pages/search/local-store'
import SecurityLayout from './layout/security-layout'
import {GlobalStoreProvider} from './store'
import { useObserver } from "mobx-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Restauarants from "./pages/restauarants";
import Search from "./pages/search"

export default function BasicExample() {
  return useObserver(()=> {
    return  ( <GlobalStoreProvider>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>

          <SecurityLayout>
            <Route exact path="/">
              <RestaurantStoreProvider>
                <Restauarants/>
              </RestaurantStoreProvider>
            </Route>
            <Route exact path="/search">
              <SearchStoreProvider>
                <Search/>
              </SearchStoreProvider>
            </Route>

          </SecurityLayout>

        </Switch>
      </Router>
    </GlobalStoreProvider>)
  });
}




