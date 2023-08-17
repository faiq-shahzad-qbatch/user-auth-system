import { SET_LOADER } from "./actionCreators";

export const setLoader = (data) => ({
  type: SET_LOADER,
  payload: { showLoader: data },
});
