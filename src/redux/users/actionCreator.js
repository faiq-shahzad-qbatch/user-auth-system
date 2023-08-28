import actions from "./actions";
import axiosInstance from "../../utils/axiosUtils";
// import nofifySlack from "../../utils/notifySlack";

// const signUpUser = (body, navigate) => {
//   return async (dispatch) => {
//     try {
//       dispatch(actions.signUpUserBegin());
//       const response = await axiosInstance.post("/users", body);
//       if (actions.isSuccess(response)) {
//         dispatch(actions.signUpUserSuccess(response.data));
//         navigate("/login");
//       }
//     } catch (error) {
//       dispatch(actions.apiError("Sign up failed!"));
//       nofifySlack(error.response);
//     }
//   };
// };

// const loginUser = (body, navigate) => {
//   return async (dispatch) => {
//     try {
//       dispatch(actions.loginUserBegin());
//       const response = await axiosInstance.post("/auth/login", body);
//       if (actions.isSuccess(response)) {
//         localStorage.setItem("access_token", response.data.access_token);
//         localStorage.setItem("refresh_token", response.data.refresh_token);
//         navigate("/home");
//         dispatch(actions.loginUserSuccess());
//       }
//     } catch (error) {
//       dispatch(actions.apiError("Login failed!"));
//     }
//   };
// };

// const fetchUserData = (navigate) => {
//   return async (dispatch) => {
//     try {
//       dispatch(actions.fetchUserDataBegin());
//       const response = await axiosInstance.get(
//         "https://dummyjson.com/auth/users/1",
//       );
//       if (actions.isSuccess(response)) {
//         dispatch(actions.fetchUserDataSuccess(response.data));
//       }
//     } catch (error) {
//       if (error?.response?.status === 401) {
//         dispatch(
//           actions.apiError("Your session has expired please login again!"),
//         );
//         localStorage.clear();
//         navigate("/login");
//         return;
//       }
//       dispatch(actions.apiError("Failed to fetch user data!"));
//     }
//   };
// };

const signUpUser = (body, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.signUpUserBegin());
      const response = await axiosInstance.post(
        "https://dummyjson.com/users/add",
        {
          firstName: "Muhammad",
          lastName: "Ovi",
          age: 250,
        },
      );
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
      const response = await axiosInstance.post(
        "https://dummyjson.com/auth/login",
        {
          username: "kminchelle",
          password: "0lelplR",
        },
      );
      if (actions.isSuccess(response)) {
        localStorage.setItem("access_token", response.data.token);
        navigate("/home");
        dispatch(actions.loginUserSuccess());
      }
    } catch (error) {
      dispatch(actions.apiError("Login failed!"));
    }
  };
};

const fetchUserData = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchUserDataBegin());
      const response = await axiosInstance.get(
        "https://dummyjson.com/auth/users/1",
      );
      if (actions.isSuccess(response)) {
        dispatch(actions.fetchUserDataSuccess(response.data));
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(
          actions.apiError("Your session has expired please login again!"),
        );
        localStorage.clear();
        navigate("/login");
        return;
      }
      dispatch(actions.apiError("Failed to fetch user data!"));
    }
  };
};

const loginGoogleUser = (useGoogleLogin, navigate) => {
  return async (dispatch) => {
    useGoogleLogin({
      onSuccess: (tokenResponse) => {
        localStorage.setItem("access_token", tokenResponse.access_token);
        localStorage.setItem("loginMethod", "google");
        navigate("/home");
        dispatch(actions.loginGoogleUserSuccess());
      },
      onError: (error) => {
        dispatch(actions.apiError("Google login failed!"));
      },
    });
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
        dispatch(
          actions.apiError("Your session has expired please login again!"),
        );
        localStorage.clear();
        navigate("/login");
        return;
      }
      dispatch(actions.apiError("Failed to fetch google user data!"));
    }
  };
};

export {
  signUpUser,
  loginUser,
  fetchUserData,
  fetchGoogleUserData,
  loginGoogleUser,
};
