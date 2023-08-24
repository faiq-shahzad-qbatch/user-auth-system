import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ReactJson from "react-json-view";
import { ToastContext } from "../contexts/ToastContext";

function FacebookHomePage() {
  const [data, setData] = useState({});

  const toast = useContext(ToastContext);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setData(location.state.data);
  }, [location]);

  function handleFacebookLogout() {
    navigate("/login");
    toast.success("Facebook Logout Successful!");
  }

  return (
    <>
      <div className="to-indigo-custom flex h-screen flex-col items-center justify-center space-y-4 bg-gradient-to-r from-gray-700 py-4">
        <h1 className="animate-flip-up text-center font-mono text-4xl text-white animate-delay-500">
          Facebook Authentication Data
        </h1>
        <div className="w-2/3 animate-flip-down overflow-y-auto break-all animate-delay-500">
          <ReactJson src={data} iconStyle="square" theme="harmonic" />
        </div>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            onClick={handleFacebookLogout}
            className="bg-indigo-custom rounded-md px-4 py-2 text-white hover:bg-indigo-500 hover:shadow-md"
          >
            Facebook Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default FacebookHomePage;
