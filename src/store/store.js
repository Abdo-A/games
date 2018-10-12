import { createStore, combineReducers } from "redux";

import dominoReducer from "./reducers/dominoReducer";

const reducer = combineReducers({
  domino: dominoReducer
});

const store = createStore(reducer);

export default store;
