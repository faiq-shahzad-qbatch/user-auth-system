import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import Loader from "../components/Loader";
import _ from "lodash";
import axiosInstance from "../utils/axiosUtils";
import { useSelector } from "react-redux";
import validatePassword from "../utils/validatePassword";

function SignUpPage() {
  const showLoader = useSelector((state) => state.loaderReducer.showLoader);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  async function handleSignup(e) {
    e.preventDefault();

    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      const rules = validatePassword(passwordRef.current.value);

      if (rules.length === 0) {
        const body = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        };

        try {
          await axiosInstance.post("/users/", body);
          toast("Sign Up Successful!");
        } catch (error) {
          toast(_.first(error.response.data.message));
        }
      } else {
        alert(`Your password fails to match the following rule(s): ${rules} `);
      }
    } else {
      alert("Passwords don't match!");
    }
  }

  return (
    <>
      <ToastContainer theme="dark" />
      <Loader show={showLoader} />
      <div className="flex h-screen items-center justify-center ">
        <div className="w-sm flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
          <form
            className="w-sm flex flex-col items-center justify-center md:w-72"
            onSubmit={handleSignup}
          >
            <input
              type="text"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Name"
              ref={nameRef}
              required
            />
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
            <input
              type="password"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              required
            />
            <button
              type="submit"
              className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
