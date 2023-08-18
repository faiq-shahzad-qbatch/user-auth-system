import React, { useCallback, useEffect, useState } from "react";

import Loader from "../components/Loader";
import ReactJson from "react-json-view";
import axiosInstance from "../utils/axiosUtils";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const showLoader = useSelector((state) => state.loaderReducer.showLoader);
  const [userProfile, setUserProfile] = useState({});

  const navigate = useNavigate();

  const getUserDetails = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
      );
      setUserProfile(response.data);
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        alert("Your session has expired please login again!");
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  function logoutFromGoogle() {
    googleLogout();
    navigate("/login");
  }

  return (
    <>
      <Loader show={showLoader} />
      <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-gradient-to-r from-slate-500 to-cyan-500">
        <h1 className=" font-mono text-8xl">User Details</h1>
        <ReactJson src={userProfile} theme="solarized" />
        <button
          onClick={logoutFromGoogle}
          className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
        >
          Logout from Google
        </button>
      </div>
    </>
  );
}

export default HomePage;
