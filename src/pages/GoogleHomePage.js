import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ReactJson from "react-json-view";
import { ToastContext } from "../contexts/ToastContext";
import { googleLogout } from "@react-oauth/google";

function GoogleHomePage() {
  const [data, setData] = useState({});

  const toast = useContext(ToastContext);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setData(location.state.data);
  }, [location]);

  function handleGoogleLogout() {
    googleLogout();
    navigate("/login");
    toast.success("Google Logout Successful!");
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-gradient-to-r from-slate-500 to-cyan-500">
        <h1 className="animate-flip-up text-center font-mono text-4xl animate-delay-500">
          Google Authentication Data
        </h1>
        <div className="w-2/3 animate-flip-down overflow-y-auto break-all animate-delay-500">
          <ReactJson src={data} iconStyle="square" theme="flat" />
        </div>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            onClick={handleGoogleLogout}
            className="rounded-md bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
          >
            Google Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default GoogleHomePage;
