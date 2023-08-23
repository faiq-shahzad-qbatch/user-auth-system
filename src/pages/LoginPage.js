import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";

import Joi from "joi";
import { ToastContext } from "../contexts/ToastContext";
import axios from "axios";
import axiosInstance from "../utils/axiosUtils";
import playNotification from "../utils/playNotification";
import { useGoogleLogin } from "@react-oauth/google";

// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(8).max(20).required().label("Password"),
  });

  function validate(values) {
    const { error } = validationSchema.validate(values, { abortEarly: false });
    if (!error) return {};

    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const toast = useContext(ToastContext);

  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleLogin(values, { setSubmitting }) {
    const body = {
      email: values.email,
      password: values.password,
    };

    try {
      const {
        data: { access_token, refresh_token },
      } = await axiosInstance.post("auth/login", body);

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      navigate("/home");
      toast.success("Login Successful!");
      playNotification();
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setSubmitting(false);
  }

  async function responseGoogle(tokenResponse) {
    try {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
      navigate("/google", { state: { data: userInfo.data } });
      toast.success("Google Login Successful!");
      playNotification();
    } catch (error) {
      console.error(error);
    }
  }

  function errorGoogle() {
    toast.error("Google Login Failed!");
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: errorGoogle,
  });

  // function responseFacebook(response) {
  //   navigate("/facebook", { state: { data: response } });
  //   toast.success("Facebook Login Successful!");
  //   playNotification();
  // }

  // function errorFacebook() {
  //   toast.error("Facebook Login Failed");
  // }

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="w-sm flex animate-fade-down flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Login</h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleLogin}
          >
            <Form className="max-w-xs">
              <div className="mb-2">
                <Field
                  name="email"
                  type="email"
                  className="mb-2 w-full rounded-md bg-[#94A3B8] p-2 placeholder:text-gray-700"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="animate-pulse text-sm text-red-500"
                />
              </div>
              <div className="mb-2">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="mb-2 w-full rounded-md bg-[#94A3B8] p-2 placeholder:text-gray-700"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="animate-pulse text-sm text-red-500"
                />
              </div>
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
                className="my-2 w-52 rounded-md bg-pink-500 px-4 py-2 text-white hover:shadow-md md:w-72"
              >
                Login
              </button>
              <div>
                <button
                  type="button"
                  className="dark:focus:ring-[#4285F4]/55 mb-2 flex w-52 flex-row items-center justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 md:w-72"
                  onClick={googleLogin}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Login with Google
                </button>
              </div>
              {/* <div>
                <FacebookLogin
                  appId="735205141747241"
                  fields="name,email,picture"
                  callback={responseFacebook}
                  onFailure={errorFacebook}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="dark:focus:ring-[#3b5998]/55 mb-2 flex w-52 flex-row items-center justify-center rounded-lg bg-[#3b5998] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#3b5998]/90 focus:outline-none focus:ring-4 focus:ring-[#3b5998]/50 md:w-72"
                      onClick={renderProps.onClick}
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 8 19"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Login with Facebook
                    </button>
                  )}
                />
              </div> */}
            </Form>
          </Formik>

          <p className="my-2">
            Not a user?{" "}
            <Link to={"/"} className=" font-normal text-pink-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
