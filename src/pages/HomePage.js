import {
  CheckCircleOutlined,
  LeftSquareOutlined,
  LogoutOutlined,
  RightSquareOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as DribbleLogo } from "../assets/svgs/dribble-logo.svg";
import { ReactComponent as FacebookLogo } from "../assets/svgs/facebook-logo.svg";
import { ReactComponent as GitHubLogo } from "../assets/svgs/github-logo.svg";
import { ReactComponent as LinkedInLogo } from "../assets/svgs/linkedin-logo.svg";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { ToastContext } from "../contexts/ToastContext";
import { ReactComponent as TwitterLogo } from "../assets/svgs/twitter-logo.svg";
import _ from "lodash";
import axiosInstance from "../utils/axiosUtils";
import userImage from "../media/user.png";

function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [userData, setUserData] = useState({});

  const toast = useContext(ToastContext);

  const location = useLocation();

  const navigate = useNavigate();

  const getUserDetails = useCallback(async () => {
    const loginMethod = localStorage.getItem("loginMethod");

    switch (loginMethod) {
      case "google":
        try {
          const { data } = await axiosInstance.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
          );
          setUserData(data);
        } catch (error) {
          const errorStatus = error?.response?.status;
          if (errorStatus === 401) {
            toast.error("Your session has expired please login again!");
            localStorage.clear();
            navigate("/login");
          } else {
            toast.error("Failed To Fetch User Data!");
          }
        }
        break;
      case "facebook":
        setUserData(location?.state?.data);
        break;
      default:
        try {
          const { data } = await axiosInstance.get("auth/profile");
          setUserData(data);
        } catch (error) {
          const errorStatus = error?.response?.data?.statusCode;
          if (errorStatus === 401) {
            toast.error("Your session has expired please login again!");
            localStorage.clear();
            navigate("/login");
          } else {
            toast.error("Failed to fetch user data!");
          }
        }
        break;
    }
  }, [location, toast, navigate]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successful!");
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <>
      <div className="flex h-screen">
        <aside
          className={`${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } absolute inset-0 z-40 w-2/3 transform flex-col justify-start bg-gray-700 transition-transform duration-300 ease-in-out dark:bg-gray-900 md:w-1/3 lg:w-1/6`}
        >
          {showSidebar && (
            <div
              className="absolute left-[105%] mt-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm bg-indigo-custom text-white hover:bg-indigo-500"
              onClick={toggleSidebar}
            >
              <LeftSquareOutlined />
            </div>
          )}
          <div className="flex flex-row items-center justify-evenly px-4 text-white">
            <CheckCircleOutlined />
            <h1 className="text-md px-2 py-4 text-center text-xl font-semibold">
              User Auth System
            </h1>
          </div>
          <hr className="mx-2 border-white" />
          <nav>
            <ul className="flex flex-col justify-center space-y-4 p-2">
              <li className="flex cursor-pointer flex-row items-center justify-start space-x-2 rounded-md bg-indigo-custom px-4 py-2 text-white hover:bg-indigo-500 hover:shadow-md">
                <UserOutlined />
                <p>Profile</p>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer flex-row items-center justify-start space-x-2 rounded-md bg-indigo-custom px-4 py-2 text-start text-white hover:bg-indigo-500 hover:shadow-md"
                >
                  <LogoutOutlined />
                  <p>Logout</p>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="flex flex-1 flex-col justify-center overflow-hidden bg-[#E2E8F0] dark:bg-gray-800">
          <header className="flex h-14 items-center justify-start bg-gray-700 px-4 text-white dark:bg-gray-900">
            <div className="mr-4 flex items-center justify-center">
              <div
                className=" flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm bg-indigo-custom text-white hover:bg-indigo-500"
                onClick={toggleSidebar}
              >
                <RightSquareOutlined />
              </div>
            </div>

            <SearchOutlined />
            <input
              name="searchBar"
              type="search"
              placeholder="Type to search..."
              className="m-2 w-2/3 rounded-md bg-gray-700 p-2 focus:outline-none focus:ring focus:ring-indigo-custom"
            />
            <div className="ml-auto flex items-center justify-center space-x-4">
              <ThemeSwitcher />
              <LogoutOutlined
                className="cursor-pointer hover:text-indigo-500"
                onClick={handleLogout}
              />
              <SettingOutlined className="cursor-pointer hover:text-indigo-500" />
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-indigo-custom font-bold hover:animate-wiggle-more hover:animate-infinite">
                {_.first(userData.name)}
              </div>
            </div>
          </header>

          <main className="flex h-full flex-1 flex-col overflow-y-auto overflow-x-hidden dark:text-gray-200">
            <div className="mx-auto p-6">
              <div>
                <h1 className="text-4xl font-semibold">Profile</h1>
              </div>

              <div className="mt-4 overflow-hidden rounded-md bg-white dark:bg-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80"
                  alt="profile cover"
                  className="relative z-10 h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                />

                <div className="p-4 text-center">
                  <div className="relative z-20 mx-auto -mt-20 h-32 w-32 ">
                    <img
                      src={userImage}
                      alt="profile"
                      className="rounded-full border-2 border-indigo-custom "
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-2 text-2xl font-semibold">
                      {userData.name}
                    </h3>

                    <div className="mx-auto my-4 grid max-w-sm grid-cols-1 rounded-md bg-indigo-custom text-white md:grid-cols-3">
                      <div className="mx-4 my-2 flex border-spacing-2 flex-row items-center justify-center space-x-2 border-b-[1px] md:mx-0 md:border-b-0 md:border-r-[1px] md:border-white">
                        <span className="text-lg font-bold">259</span>
                        <span className="text-sm">Posts</span>
                      </div>
                      <div className="mx-4 my-2 flex border-spacing-2 flex-row items-center justify-center space-x-2 border-b-[1px] md:mx-0 md:border-b-0 md:border-r-[1px] md:border-white">
                        <span className="text-lg font-bold">129K</span>
                        <span className="text-sm">Follower</span>
                      </div>
                      <div className="my-2 flex border-spacing-2 flex-row items-center justify-center space-x-2">
                        <span className="text-lg font-bold">2K</span>
                        <span className="text-sm">Following</span>
                      </div>
                    </div>

                    <div className="mx-auto max-w-2xl">
                      <h4 className="font-semibold">About Me</h4>

                      <p className="mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque posuere fermentum urna, eu condimentum
                        mauris tempus ut. Donec fermentum blandit aliquet. Etiam
                        dictum dapibus ultricies. Sed vel aliquet libero. Nunc a
                        augue fermentum, pharetra ligula sed, aliquam lacus.
                      </p>
                    </div>

                    <div className="mt-6">
                      <h4 className="mb-4 font-medium">Follow me on</h4>
                      <div className="flex flex-row items-center justify-center space-x-2">
                        <FacebookLogo className="cursor-pointer hover:fill-indigo-custom" />
                        <TwitterLogo className="cursor-pointer hover:fill-indigo-custom" />
                        <LinkedInLogo className="cursor-pointer hover:fill-indigo-custom" />
                        <DribbleLogo className="cursor-pointer hover:fill-indigo-custom" />
                        <GitHubLogo className="cursor-pointer hover:fill-indigo-custom" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
