import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";

import { ToastContext } from "../contexts/ToastContext";
import _ from "lodash";
import axiosInstance from "../utils/axiosUtils";
import getInvalidPasswordMessage from "../utils/getInvalidPasswordMessage";
import notifySlack from "../utils/notifySlack";
import validatePassword from "../utils/validatePassword";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const toast = useContext(ToastContext);

  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleSignup(e) {
    e.preventDefault();

    // Check if the password and confirm password fields match
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.warn("Passwords don't match!");
      return;
    }

    // Check if the password is valid
    const rules = validatePassword(passwordRef.current.value);
    if (!_.isEmpty(rules)) {
      const message = getInvalidPasswordMessage(rules);
      alert(
        `Your password fails to pass the following rule(s):\n\n${message} `,
      );
      return;
    }

    // If all is good then create the new user
    const body = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };

    try {
      await axiosInstance.post("/users", body);
      navigate("/login");
      toast.success("Sign Up Successful!");
    } catch (error) {
      toast.error(_.first(error.response.data.message));
      notifySlack(JSON.stringify(error.response.data, null, 2));
    }
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="w-sm flex flex-col items-center justify-center rounded-lg bg-slate-300 bg-opacity-80 p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
          <form
            className="w-sm flex flex-col items-center justify-center md:w-72"
            onSubmit={handleSignup}
          >
            <input
              id="name"
              type="text"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Name"
              ref={nameRef}
              required
              autoComplete="off"
            />
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
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
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
              className="my-2 w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
            >
              Sign Up
            </button>
          </form>
          <p className="my-2">
            Already a user?{" "}
            <Link to={"/login"} className=" text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
