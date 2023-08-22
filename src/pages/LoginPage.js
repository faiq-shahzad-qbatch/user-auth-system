import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";

import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContext } from "../contexts/ToastContext";
import axiosInstance from "../utils/axiosUtils";
import validator from "validator";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const toast = useContext(ToastContext);

  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleLogin(e) {
    e.preventDefault();

    // Check if the email is valid
    if (!validator.isEmail(emailRef.current.value)) {
      toast.warn("Invalid email!");
      return;
    }

    // If all is good proceed to login
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

      navigate("/home");
      toast.success("Login Successful!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  function responseGoogle(response) {
    navigate("/google", { state: { data: response } });
    toast.success("Google Login Successful!");
  }

  function errorGoogle() {
    toast.error("Google Login Failed!");
  }

  function responseFacebook(response) {
    navigate("/facebook", { state: { data: response } });
    toast.success("Facebook Login Successful!");
  }

  function errorFacebook() {
    toast.error("Facebook Login Failed");
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="animate-fade-down w-sm flex flex-col items-center justify-center rounded-lg bg-slate-300 bg-opacity-80 p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Login</h2>
          <form
            className="w-sm flex flex-col items-center justify-center md:w-72"
            onSubmit={handleLogin}
          >
            <input
              id="email"
              type="text"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Email"
              ref={emailRef}
              required
              autoComplete="off"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Password"
              ref={passwordRef}
              required
              autoComplete="off"
            />
            <div className="flex items-center justify-start space-x-4 self-start">
              <input
                id="togglePassword"
                type="checkbox"
                value={showPassword}
                onClick={togglePasswordVisibility}
              />
              <label htmlFor="togglePassword">Show Password</label>
            </div>
            <button
              type="submit"
              className="my-2 w-[90%] rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
            >
              Login
            </button>
          </form>
          <div className="my-2">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={errorGoogle}
              useOneTap
            />
          </div>
          <div className="my-2">
            <FacebookLogin
              appId="735205141747241"
              fields="name,email"
              callback={responseFacebook}
              onFailure={errorFacebook}
            />
          </div>
          <p className="my-2">
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
