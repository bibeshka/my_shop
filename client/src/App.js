import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
//components
import Header from "./components/HeaderContainer";
import Home from "./components/HomeContainer";
import ProductPage from "./components/ProductContainer";
import ShoppingCart from "./components/ShoppingCartContainer";
import FavoritesContainer from "./components/FavoritesContainer";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import OrderPageContainer from "./components/OrderPageContainer";
import PageNotFound from "./components/PageNotFoundContainer";
import Footer from "./components/FooterContainer";
import AddProductForm from "./components/AdminPageContainer/AddProductForm";
import ProductList from "./components/AdminPageContainer/ProductList";
import OrderList from "./components/AdminPageContainer/OrderList";

function App({ userReducer }) {
  let isAdmin = userReducer.userInfo ? userReducer.userInfo.isAdmin : false;

  return (
    <div className="App" data-testid="application">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/favorites" component={FavoritesContainer} />

          <Route exact path="/signup" component={RegisterUser} />
          <Route exact path="/login" component={LoginUser} />

          <Route exact path="/order" component={OrderPageContainer} />

          <Route exact path="/admin">
            {isAdmin ? <AddProductForm /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/admin/orders">
            {isAdmin ? <OrderList /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/admin/products">
            {isAdmin ? <ProductList /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/pagenotfound" component={PageNotFound} />
          <Route exact path="/:id" component={ProductPage} />

          <Route path="*" exact component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

export default connect(mapStateToProps)(App);
