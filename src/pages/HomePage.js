import React, { useCallback, useContext, useEffect, useState } from "react";

import ReactJson from "react-json-view";
import { ToastContext } from "../contexts/ToastContext";
import axiosInstance from "../utils/axiosUtils";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [userProfile, setUserProfile] = useState({});

  const toast = useContext(ToastContext);

  const navigate = useNavigate();

  const getUserDetails = useCallback(async () => {
    try {
      const response = await axiosInstance.get("auth/profile");
      setUserProfile(response.data);
    } catch (error) {
      if (error.response?.data.statusCode === 401) {
        toast.error("Your session has expired please login again!");
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [toast, navigate]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successful!");
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-gradient-to-r from-slate-500 to-cyan-500">
        <h1 className="font-mono text-6xl">User Details</h1>
        <div className="break-all">
          <ReactJson src={userProfile} iconStyle="square" theme="flat" />
        </div>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            onClick={handleLogout}
            className=" rounded-md bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
