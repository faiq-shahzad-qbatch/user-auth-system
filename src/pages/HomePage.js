import React, { useCallback, useContext, useEffect, useState } from "react";

import ReactJson from "react-json-view";
import { ToastContext } from "../contexts/ToastContext";
import _ from "lodash";
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
      <div className="flex h-screen">
        <aside className="w-1/3 flex-col justify-center bg-[#E2E8F0] text-gray-700 md:w-1/6">
          <h1 className="text-md px-2 py-4 text-center font-semibold">
            User Authentication System
          </h1>
          <hr className="mx-2 border-gray-700" />
          <nav>
            <ul className="flex flex-col justify-center space-y-4 p-2">
              <li className="cursor-pointer text-pink-500 underline hover:text-pink-600">
                Home
              </li>
              <li className="cursor-pointer text-pink-500 underline hover:text-pink-600">
                About
              </li>
              <li className="cursor-pointer text-pink-500 underline hover:text-pink-600">
                Contact
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-pink-500 px-4 py-2 text-white hover:shadow-md"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="flex flex-1 flex-col justify-center overflow-hidden">
          <header className="flex h-14 items-center justify-between bg-[#E2E8F0] px-2 text-gray-700">
            <input
              type="search"
              placeholder="Search..."
              className="m-2 w-2/3 rounded-md p-2 shadow-md focus:border-blue-300 focus:outline-none focus:ring"
            />
            <div className="flex items-center justify-center space-x-4">
              <h1 className="text-2xl font-normal">Settings</h1>
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-pink-500 font-bold animate-delay-500 hover:animate-jump">
                {_.first(userProfile.name)}
              </div>
            </div>
          </header>

          <main className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center space-y-4 bg-[#E2E8F0]">
              <h1 className="animate-flip-up text-center font-mono text-6xl text-gray-700 animate-delay-500">
                User Details
              </h1>
              <div className="w-2/3 animate-flip-down overflow-y-auto break-all rounded-md shadow-md animate-delay-500">
                <ReactJson
                  src={userProfile}
                  iconStyle="square"
                  theme="paraiso"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
