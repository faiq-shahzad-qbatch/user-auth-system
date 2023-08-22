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
      <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-gradient-to-r from-slate-500 to-cyan-500">
        <h1 className="animate-flip-up animate-delay-500 text-center font-mono text-4xl">
          Facebook Authentication Data
        </h1>
        <div className="animate-flip-down animate-delay-500 w-2/3 overflow-y-auto break-all">
          <ReactJson src={data} iconStyle="square" theme="flat" />
        </div>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            onClick={handleFacebookLogout}
            className="rounded-md bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
          >
            Facebook Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default FacebookHomePage;
