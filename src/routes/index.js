import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../pages/Header";
import Main from "../pages/Main";
import Footer from '../pages/Footer';
import Explore from '../pages/Explore';
import Activity from '../pages/Activity';
import Asset from '../pages/Asset';
import Token from '../pages/Token';
import Blog from '../pages/Blog';
import Faq from "../pages/Faq";
import Contact from "../pages/Contact";
import Authors from "../pages/Authors";
import Author from "../pages/Author";
import Collection from "../pages/Collection";
import Create from "../pages/Create";
import SignIn from "../pages/Sign/SignIn";
import SignUp from "../pages/Sign/SignUp";
import Forgot from "../pages/Sign/ForgotPassword";
import Error from "../pages/404";
import Privacy from "../pages/Privacy";
function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/explore" component={Explore} />
          <Route path="/activity" component={Activity} />     
          <Route path="/item" component={Asset}/>
          <Route path="/token" component={Token}/>
          <Route path="/blog" component={Blog}/>
          <Route path="/faq" component={Faq}/>
          <Route path="/contacts" component={Contact}/>
          <Route path="/creators" component={Authors}/>
          <Route path="/creator" component={Author}/>
          <Route path="/collection" component={Collection}/>
          <Route path="/create" component={Create}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/forgot" component={Forgot}/>
          <Route path="/404" component={Error}/>
          <Route path="/privacy" component={Privacy}/>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Routes;
