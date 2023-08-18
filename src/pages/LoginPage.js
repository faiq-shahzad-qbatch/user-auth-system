import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from "react";

import { GoogleLogin } from "@react-oauth/google";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
import axiosInstance from "../utils/axiosUtils";
import { useSelector } from "react-redux";

function LoginPage() {
  const showLoader = useSelector((state) => state.loaderReducer.showLoader);

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const {
        data: { access_token, refresh_token },
      } = await axiosInstance.post("auth/login", body);

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      // toast("Login Successful!");
      navigate("/home");
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <ToastContainer theme="dark" />
      <Loader show={showLoader} />
      <div className="flex h-screen items-center justify-center ">
        <div className="w-sm flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Login</h2>
          <form
            className="w-sm flex flex-col items-center justify-center md:w-72"
            onSubmit={handleLogin}
          >
            <input
              type="text"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Email"
              ref={emailRef}
              required
            />
            <input
              type="password"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <button
              type="submit"
              className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                navigate("/home");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <p className="mt-4">
            Not a user?{" "}
            <Link to={"/"} className=" text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
