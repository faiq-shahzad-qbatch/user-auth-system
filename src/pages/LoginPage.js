import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";

// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Joi from "joi";
import { ToastContext } from "../contexts/ToastContext";
import axiosInstance from "../utils/axiosUtils";
import playNotification from "../utils/playNotification";
import { useGoogleLogin } from "@react-oauth/google";

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
    setSubmitting(true);

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
    localStorage.setItem("access_token", tokenResponse.access_token);
    navigate("/google");
    toast.success("Google Login Successful!");
    playNotification();
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
            <Form className="w-52 md:w-72">
              <div className="mb-2">
                <Field
                  name="email"
                  type="email"
                  className="mb-2 w-full rounded-md bg-gray-300 p-2 placeholder:text-gray-700"
                  placeholder="Email"
                  autoComplete="off"
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
                  className="mb-2 w-full rounded-md bg-gray-300 p-2 placeholder:text-gray-700"
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
                className="bg-indigo-custom my-2 w-full rounded-md px-4 py-2 text-white hover:bg-indigo-500 hover:shadow-md"
              >
                Login
              </button>
              <div>
                <button
                  type="button"
                  className="dark:focus:ring-[#4285F4]/55 mb-2 flex w-full flex-row items-center justify-center space-x-2 rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
                  onClick={googleLogin}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-white">
                    <svg
                      viewBox="0 0 32 32"
                      width="16"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <path
                          id="A"
                          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                        />
                      </defs>
                      <clipPath id="B">
                        <use xlinkHref="#A" />
                      </clipPath>
                      <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                        <path
                          d="M0 37V11l17 13z"
                          clipPath="url(#B)"
                          fill="#fbbc05"
                        />
                        <path
                          d="M0 11l17 13 7-6.1L48 14V0H0z"
                          clipPath="url(#B)"
                          fill="#ea4335"
                        />
                        <path
                          d="M0 37l30-23 7.9 1L48 0v48H0z"
                          clipPath="url(#B)"
                          fill="#34a853"
                        />
                        <path
                          d="M48 48L17 24l-4-3 35-10z"
                          clipPath="url(#B)"
                          fill="#4285f4"
                        />
                      </g>
                    </svg>
                  </div>
                  <span>Continue with Google</span>
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
                      className="dark:focus:ring-[#3b5998]/55 mb-2 flex w-full flex-row items-center justify-center rounded-lg bg-[#3b5998] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#3b5998]/90 focus:outline-none focus:ring-4 focus:ring-[#3b5998]/50"
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
                      Continue with Facebook
                    </button>
                  )}
                />
              </div> */}
            </Form>
          </Formik>

          <p className="my-2">
            Not a user?{" "}
            <Link
              to={"/"}
              className="text-indigo-custom font-normal underline hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
