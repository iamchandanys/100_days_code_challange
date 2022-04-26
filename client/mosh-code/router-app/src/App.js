import React, { Component } from "react";
import NavBar from "./components/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          {/* Switch & exact will try to match exact path url. */}
          <Switch>
            <Route path="/products/:id" component={ProductDetails} />
            {/* Render is used to send custom props to the component */}
            {/* Once the render is used, the other props like History, Location & Match won't be there.
            Hence we can resolve it by passing props as spread parameter. */}
            <Route path="/products" render={(props) => <Products sortBy="newest" {...props} />} />
            <Route path="/posts/:year?/:month?" component={Posts} />
            <Route path="/admin" component={Dashboard} />
            {/* If the user redirects to messages, it will automatically redirects to posts */}
            <Redirect from="/messages" to="/posts" />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            {/* If none of our path match */}
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
