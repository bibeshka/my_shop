import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/HeaderContainer';
import Home from './components/HomeContainer';
import ProductPage from './components/ProductContainer';
import ShoppingCart from './components/ShoppingCartContainer';
import FavoritesContainer from './components/FavoritesContainer';
import LoginPage from './components/LoginPageContainer';
import AdminContainer from './components/AdminPageContainer';
import OrderPageContainer from './components/OrderPageContainer';
import PageNotFound from './components/PageNotFoundContainer';

function App() {
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
            <Route exact path="/admin" component={AdminContainer} />
            <Route exact path="/order" component={OrderPageContainer} />
            {/* <Route path="*" component={PageNotFound} /> */}
            <Route exact path="/:id" component={ProductPage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
