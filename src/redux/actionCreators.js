import { SET_LOADER } from "./actionTypes";

export const setLoader = (data) => ({
  type: SET_LOADER,
  payload: { showLoader: data },
});
