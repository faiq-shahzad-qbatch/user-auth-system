const actions = {
  SIGN_UP_USER_BEGIN: "SIGN_UP_USER_BEGIN",
  SIGN_UP_USER_SUCCESS: "SIGN_UP_USER_SUCCESS",

  LOGIN_USER_BEGIN: "LOGIN_USER_BEGIN",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",

  FETCH_USER_DATA_BEGIN: "FETCH_USER_DATA_BEGIN",
  FETCH_USER_DATA_SUCCESS: "FETCH_USER_DATA_SUCCESS",

  LOGIN_GOOGLE_USER_BEGIN: "LOGIN_GOOGLE_USER_BEGIN",
  LOGIN_GOOGLE_USER_SUCCESS: "LOGIN_GOOGLE_USER_SUCCESS",

  FETCH_GOOGLE_USER_DATA_BEGIN: "FETCH_GOOGLE_USER_DATA_BEGIN",
  FETCH_GOOGLE_USER_DATA_SUCCESS: "FETCH_GOOGLE_USER_DATA_SUCCESS",

  API_ERROR: "API_ERROR",

  signUpUserBegin: () => {
    return {
      type: actions.SIGN_UP_USER_BEGIN,
    };
  },

  signUpUserSuccess: (data) => {
    return {
      type: actions.SIGN_UP_USER_SUCCESS,
      payload: data,
    };
  },

  loginUserBegin: () => {
    return {
      type: actions.LOGIN_USER_BEGIN,
    };
  },

  loginUserSuccess: () => {
    return {
      type: actions.LOGIN_USER_SUCCESS,
    };
  },

  fetchUserDataBegin: () => {
    return {
      type: actions.FETCH_USER_DATA_BEGIN,
    };
  },

  fetchUserDataSuccess: (data) => {
    return {
      type: actions.FETCH_USER_DATA_SUCCESS,
      payload: data,
    };
  },

  loginGoogleUserBegin: () => {
    return {
      type: actions.LOGIN_GOOGLE_USER_BEGIN,
    };
  },

  loginGoogleUserSuccess: () => {
    return {
      type: actions.LOGIN_GOOGLE_USER_BEGIN,
    };
  },

  fetchGoogleUserDataBegin: () => {
    return {
      type: actions.FETCH_GOOGLE_USER_DATA_BEGIN,
    };
  },

  fetchGoogleUserDataSuccess: (data) => {
    return {
      type: actions.FETCH_GOOGLE_USER_DATA_SUCCESS,
      payload: data,
    };
  },

  isSuccess: (response) => {
    return response.status >= 200 && response.status < 300;
  },

  apiError: (error) => {
    return {
      type: actions.API_ERROR,
      payload: error,
    };
  },
};

export default actions;
