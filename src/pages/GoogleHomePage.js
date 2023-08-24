import React, { useCallback, useContext, useEffect, useState } from "react";

import ReactJson from "react-json-view";
import { ToastContext } from "../contexts/ToastContext";
import axiosInstance from "../utils/axiosUtils";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function GoogleHomePage() {
  const [data, setData] = useState({});

  const toast = useContext(ToastContext);

  const navigate = useNavigate();

  const getGoogleData = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
      );
      setData(data);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Your session has expired please login again!");
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [toast, navigate]);

  useEffect(() => {
    getGoogleData();
  }, [getGoogleData]);

  function handleGoogleLogout() {
    googleLogout();
    localStorage.clear();
    navigate("/login");
    toast.success("Google Logout Successful!");
  }

  return (
    <>
      <div className="to-indigo-custom flex h-screen flex-col items-center justify-center space-y-4 bg-gradient-to-r from-gray-700 py-4">
        <h1 className="animate-flip-up text-center font-mono text-4xl text-white animate-delay-500">
          Google Authentication Data
        </h1>
        <div className="w-2/3 animate-flip-down overflow-y-auto break-all animate-delay-500">
          <ReactJson src={data} iconStyle="square" theme="harmonic" />
        </div>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            onClick={handleGoogleLogout}
            className="bg-indigo-custom rounded-md px-4 py-2 text-white hover:bg-indigo-500 hover:shadow-md"
          >
            Google Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default GoogleHomePage;
