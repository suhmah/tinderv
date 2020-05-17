import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login/login";
import Main from "./pages/Main/main";
// import { Container } from './styles';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/devs/:id" component={Main} />
    </BrowserRouter>
  );
}

export default Routes;
