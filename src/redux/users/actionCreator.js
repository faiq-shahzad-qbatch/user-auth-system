import actions from "./actions";
import axiosInstance from "../../utils/axiosUtils";

// import nofifySlack from "../../utils/notifySlack";

const signUpUser = (body, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.signUpUserBegin());
      const response = await axiosInstance.post("users/add", body);
      if (actions.isSuccess(response)) {
        dispatch(actions.signUpUserSuccess(response.data));
        navigate("/login");
      }
    } catch (error) {
      dispatch(actions.apiError("Sign up failed!"));
    }
  };
};

const loginUser = (body, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.loginUserBegin());
      const response = await axiosInstance.post("auth/login", body);
      if (actions.isSuccess(response)) {
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("access_token", response.data.token);
        navigate("/home");
        dispatch(actions.loginUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(actions.apiError("Login failed!"));
    }
  };
};

const fetchUserData = (userId, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchUserDataBegin());
      const response = await axiosInstance.get(`auth/users/${userId}`);
      if (actions.isSuccess(response)) {
        dispatch(actions.fetchUserDataSuccess(response.data));
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout(navigate));
        dispatch(
          actions.apiError("Your session has expired please login again!"),
        );
        return;
      }
      dispatch(actions.apiError("Failed to fetch user data!"));
    }
  };
};

const fetchGoogleUserData = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchGoogleUserDataBegin());
      const response = await axiosInstance.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
      );
      if (actions.isSuccess(response)) {
        dispatch(actions.fetchGoogleUserDataSuccess(response.data));
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout(navigate));
        dispatch(
          actions.apiError("Your session has expired please login again!"),
        );
        return;
      }
      dispatch(actions.apiError("Failed to fetch google user data!"));
    }
  };
};

const fetchFacebookUserData = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchFacebookUserDataBegin());

      const params = {
        fields: "name,email,picture",
      };
      const response = await axiosInstance.get(
        "https://graph.facebook.com/me",
        { params },
      );

      if (actions.isSuccess(response)) {
        dispatch(actions.fetchFacebookUserDataSuccess(response.data));
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout(navigate));
        dispatch(
          actions.apiError("Your session has expired please login again!"),
        );
        return;
      }
      dispatch(actions.apiError("Failed to fetch facebook user data!"));
    }
  };
};

const logout = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.logoutBegin());
      localStorage.clear();
      dispatch(actions.logoutSuccess({}));
      navigate("/login");
    } catch (error) {
      dispatch(actions.apiError("Logout failed!"));
    }
  };
};

export {
  signUpUser,
  loginUser,
  fetchUserData,
  fetchGoogleUserData,
  fetchFacebookUserData,
  logout,
};
