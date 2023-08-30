import {
  fetchFacebookUserData,
  fetchGoogleUserData,
  fetchUserData,
} from "../redux/users/actionCreator";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

function AuthGuard({ children }) {
  const [renderChildren, setRenderChildren] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getUserData = useCallback(() => {
    const loginMethod = localStorage.getItem("loginMethod");

    switch (loginMethod) {
      case "google":
        dispatch(fetchGoogleUserData(navigate));
        break;
      case "facebook":
        dispatch(fetchFacebookUserData(navigate));
        break;
      default:
        dispatch(fetchUserData(localStorage.userId, navigate));
        break;
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const accessToken = localStorage.access_token;
    if (accessToken) {
      getUserData();
      setRenderChildren(true);
      return;
    }

    toast.error("Please login to continue!", {
      position: "top-center",
      autoClose: false,
    });
    navigate("/login");
  }, [location, getUserData, navigate]);

  return <>{renderChildren && children}</>;
}

export default AuthGuard;
