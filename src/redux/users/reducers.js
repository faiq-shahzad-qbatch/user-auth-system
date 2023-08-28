import actions from "./actions";

const { produce } = require("immer");

const initialState = {
  user: {},
  loading: false,
  success: null,
  error: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SIGN_UP_USER_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.SIGN_UP_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.user = payload;
        draftState.loading = false;
        draftState.success = "Sign up successful!";
      });

    case actions.LOGIN_USER_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.LOGIN_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.success = "Login successful!";
      });

    case actions.FETCH_USER_DATA_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.FETCH_USER_DATA_SUCCESS:
      return produce(state, (draftState) => {
        draftState.user = payload;
        draftState.loading = false;
        draftState.success = "Successfully fetched user data!";
      });

    case actions.LOGIN_GOOGLE_USER_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.LOGIN_GOOGLE_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.success = "Google login successful!";
      });

    case actions.FETCH_GOOGLE_USER_DATA_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.FETCH_GOOGLE_USER_DATA_SUCCESS:
      return produce(state, (draftState) => {
        draftState.user = payload;
        draftState.loading = false;
        draftState.success = "Successfully fetched google user data!";
      });

    case actions.API_ERROR:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.success = false;
        draftState.error = payload;
      });

    default:
      return state;
  }
};

export default userReducer;
