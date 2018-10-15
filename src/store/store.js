import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import dominoReducer from "./reducers/dominoReducer";

const middleware = [thunk];

const reducer = combineReducers({
  domino: dominoReducer
});

const store = createStore(reducer, compose(applyMiddleware(...middleware)));

export default store;
