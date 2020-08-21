import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/HeaderContainer';
import Home from './components/HomeContainer';
import ProductPage from './components/ProductContainer';
import ShoppingCart from './components/ShoppingCartContainer';
import FavoritesContainer from './components/FavoritesContainer';
import LoginPage from './components/LoginPageContainer';
// import AdminContainer from './components/AdminPageContainer';
import OrderPageContainer from './components/OrderPageContainer';
import PageNotFound from './components/PageNotFoundContainer';
import Footer from './components/FooterContainer';

// import AdminNavigation from './components/AdminPageContainer/AdminNavigation';
import AddProductForm from './components/AdminPageContainer/AddProductForm';
import ProductList from './components/AdminPageContainer/ProductList';
import OrderList from './components/AdminPageContainer/OrderList';

function App() {

  const authTokenStatus = sessionStorage.getItem('jwt');

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={ShoppingCart} />
            <Route exact path="/favorites" component={FavoritesContainer} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/order" component={OrderPageContainer} />

            <Route exact path="/admin">
              { authTokenStatus ? <AddProductForm /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/admin/orders">
              { authTokenStatus ? <OrderList/> : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/admin/products">
              { authTokenStatus ? <ProductList /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/pagenotfound" component={PageNotFound} />
            <Route exact path="/:id" component={ProductPage} />
            {/* <Router>
              <AdminNavigation />
              <Switch>
                <Route exact path="/admin">
                { authTokenStatus ? <AddProductForm /> : <Redirect to="/login" /> }
                </Route>
                <Route exact path="/admin/orders" component={OrderList}/>
                <Route exact path="/admin/products" component={ProductList} />
              </Switch>
            </Router> */}

            <Route path="*" exact component={PageNotFound} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
