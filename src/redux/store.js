import { legacy_createStore as createStore, combineReducers } from "redux"; // Import createStore directly
import { loaderReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  loaderReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
