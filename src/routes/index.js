import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../pages/Header";
import Main from "../pages/Main";
import Footer from '../pages/Footer';
import Explore from '../pages/Explore'
function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/explore" component={Explore} />
          
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Routes;
