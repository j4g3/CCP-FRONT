import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Main from './main/index';
import Dashboard from './dashboard/index';
import Login from './login/index';
import Redirect from './404/index';
const Routes = () => (
  <BrowserRouter>
    <Route path="/" exact component={Main} />
    <Route path="/dashboard/:userid/" exact component={Dashboard} name="DashBoard" />
    <Route path="/dashboard" exact component={Redirect} name="redirect" />
    <Route path="/login" component={Login} />
  </BrowserRouter>
)
export default Routes;