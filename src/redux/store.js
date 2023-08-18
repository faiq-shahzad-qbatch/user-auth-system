import { combineReducers, legacy_createStore as createStore } from "redux"; // Import createStore directly

import { composeWithDevTools } from "redux-devtools-extension";
import { loaderReducer } from "./reducers";

const rootReducer = combineReducers({
  loaderReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
