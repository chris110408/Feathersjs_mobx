import React from 'react';
import './App.css';
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
            <Route exact path="/">
                <Restauarants/>
            </Route>
        </Switch>
      </Router>
    </GlobalStoreProvider>)
  });
}




