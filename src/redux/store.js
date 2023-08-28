import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const composer =
  process.env.NODE_ENV === "production" ? compose : composeWithDevTools;

const store = createStore(
  rootReducer,
  composer(applyMiddleware(thunk.withExtraArgument())),
);

export default store;
