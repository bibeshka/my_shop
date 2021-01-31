import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import homeReducer from "./home/reducer";
import cartReducer from "./shoppingCart/reducer";
import favoriteReducer from "./favorite/reducer";
import orderReducer from "./orders/reducer";
import headerReducer from "./search/reducer";
import userReducer from "./user/reducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  homeReducer,
  cartReducer,
  favoriteReducer,
  orderReducer,
  headerReducer,
  userReducer,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
