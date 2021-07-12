import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../pages/Header";
import Main from "../pages/Main";
import Footer from '../pages/Footer';
function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Routes;
