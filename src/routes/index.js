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
          <Route path="/authors" component={Authors}/>
          <Route path="/author" component={Author}/>
          <Route path="/collection" component={Collection}/>
          <Route path="/create" component={Create}/>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Routes;
