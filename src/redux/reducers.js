import { SET_LOADER } from "./actionTypes";
const { produce } = require("immer");

const initialState = {
  showLoader: false,
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return produce(state, (draftState) => {
        draftState.showLoader = action.payload.showLoader;
      });
    default:
      return state;
  }
};
