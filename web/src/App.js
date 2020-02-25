<<<<<<< HEAD
import React from 'react';
import './App.css';
import {RestaurantStoreProvider} from './pages/restauarants/local-store'
import {SearchStoreProvider} from './pages/search/local-store'
import SecurityLayout from './layout/security-layout'
import {GlobalStoreProvider} from './store'
=======
import React from "react";
import "./App.css";
import { RestaurantStoreProvider } from "./pages/restauarants/local-store";
import { SearchStoreProvider } from "./pages/search/local-store";
import SecurityLayout from "./layout/security-layout";
import { GlobalStoreProvider } from "./store";
>>>>>>> 319c27583677089eaceedcbc3ceaa1fdcf03962d
import { useObserver } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Restauarants from "./pages/restauarants";
<<<<<<< HEAD
import Search from "./pages/search"
=======
import Search from "./pages/search";
>>>>>>> 319c27583677089eaceedcbc3ceaa1fdcf03962d

export default function BasicExample() {
  return useObserver(() => {
    return (
      <GlobalStoreProvider>
        <Router>
          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route exact path="/search">
              <SearchStoreProvider>
                <Search/>
              </SearchStoreProvider>
            </Route>

            <SecurityLayout>
              <Route exact path='/'>
                <RestaurantStoreProvider>
                  <Restauarants />
                </RestaurantStoreProvider>
              </Route>
              <Route exact path='/search'>
                <SearchStoreProvider>
                  <Search />
                </SearchStoreProvider>
              </Route>
            </SecurityLayout>
          </Switch>
        </Router>
      </GlobalStoreProvider>
    );
  });
}
