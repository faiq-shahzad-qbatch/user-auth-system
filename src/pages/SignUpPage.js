import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from "react";

import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
import _ from "lodash";
import axiosInstance from "../utils/axiosUtils";
import notifySlack from "../utils/notifySlack";
import { useSelector } from "react-redux";
import validatePassword from "../utils/validatePassword";

function SignUpPage() {
  const showLoader = useSelector((state) => state.loaderReducer.showLoader);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

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
          // toast("Sign Up Successful!");
          navigate("/login");
        } catch (error) {
          alert(_.first(error.response.data.message));
          notifySlack(JSON.stringify(error, null, 2));
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
          <p className="mt-4">
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
