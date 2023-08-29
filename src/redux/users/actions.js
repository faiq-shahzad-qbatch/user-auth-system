const actions = {
  SIGN_UP_USER_BEGIN: "SIGN_UP_USER_BEGIN",
  SIGN_UP_USER_SUCCESS: "SIGN_UP_USER_SUCCESS",

  LOGIN_USER_BEGIN: "LOGIN_USER_BEGIN",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",

  FETCH_USER_DATA_BEGIN: "FETCH_USER_DATA_BEGIN",
  FETCH_USER_DATA_SUCCESS: "FETCH_USER_DATA_SUCCESS",

  FETCH_GOOGLE_USER_DATA_BEGIN: "FETCH_GOOGLE_USER_DATA_BEGIN",
  FETCH_GOOGLE_USER_DATA_SUCCESS: "FETCH_GOOGLE_USER_DATA_SUCCESS",

  FETCH_FACEBOOK_USER_DATA_BEGIN: "FETCH_FACEBOOK_USER_DATA_BEGIN",
  FETCH_FACEBOOK_USER_DATA_SUCCESS: "FETCH_FACEBOOK_USER_DATA_SUCCESS",

  LOGOUT_BEGIN: "LOGOUT_BEGIN",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",

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

  loginUserSuccess: (data) => {
    return {
      type: actions.LOGIN_USER_SUCCESS,
      payload: data,
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

  fetchFacebookUserDataBegin: () => {
    return {
      type: actions.FETCH_FACEBOOK_USER_DATA_BEGIN,
    };
  },

  fetchFacebookUserDataSuccess: (data) => {
    return {
      type: actions.FETCH_FACEBOOK_USER_DATA_SUCCESS,
      payload: data,
    };
  },

  logoutBegin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },

  logoutSuccess: (data) => {
    return {
      type: actions.LOGOUT_SUCCESS,
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
