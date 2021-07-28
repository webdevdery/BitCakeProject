import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import Footer from "components/Footer";
import Header from "components/Header";

import Main from "pages/Main";
import Explore from "pages/Explore";
import Activity from "pages/Activity";
import Asset from "pages/Asset";
import Token from "pages/Token";
import Blog from "pages/Blog";
import Faq from "pages/Faq";
import Contact from "pages/Contact";
import Authors from "pages/Authors";
import Creator from "pages/Creator";
import Collection from "pages/Collection";
import Create from "pages/Create";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Forgot from "pages/ForgotPassword";
import Error from "pages/404";
import Privacy from "pages/Privacy";

function Routes(props) {
  console.log(props);
  return (
    <div>
      <BrowserRouter>
        <Header authenticated={props.authenticated} />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/explore" component={Explore} />
          <PrivateRoute path="/activity" component={Activity} />
          <Route path="/item/:id" component={Asset} />
          <Route path="/token" component={Token} />
          <Route path="/blog" component={Blog} />
          <Route path="/faq" component={Faq} />
          <Route path="/contacts" component={Contact} />
          <Route path="/creators" component={Authors} />
          <Route path="/creator/:id" component={Creator} />
          <Route path="/collection" component={Collection} />
          <PrivateRoute
            authenticated={props.authenticated}
            path="/create"
            component={Create}
          />
          <Route
            authenticated={props.authenticated}
            path="/signin"
            component={SignIn}
          />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/404" component={Error} />
          <Route path="/privacy" component={Privacy} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Routes;
