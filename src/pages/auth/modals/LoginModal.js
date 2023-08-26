import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";

import FacebookLoginButton from "../../../components/buttons/FacebookLoginButton";
import FormikInput from "../../../components/formUI/FormikInput";
import GoogleLoginButton from "../../../components/buttons/GoogleLoginButton";
import Joi from "joi";
import ShowPasswordCheckBox from "../../../components/formUI/ShowPasswordCheckBox";
import SubmitButton from "../../../components/buttons/SubmitButton";
import { ToastContext } from "../../../contexts/ToastContext";
import axiosInstance from "../../../utils/axiosUtils";
import playNotification from "../../../utils/playNotification";
import { useGoogleLogin } from "@react-oauth/google";

function LoginModal() {
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
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) toast.error(error.response.data.message);
      toast.error("Login Failed!");
    }

    setSubmitting(false);
  }

  async function responseGoogle(tokenResponse) {
    localStorage.setItem("access_token", tokenResponse.access_token);
    localStorage.setItem("loginMethod", "google");
    navigate("/home");
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

  function responseFacebook(response) {
    localStorage.setItem("loginMethod", "facebook");
    navigate("/home", { state: { data: response } });
    toast.success("Facebook Login Successful!");
    playNotification();
  }

  function errorFacebook() {
    toast.error("Facebook Login Failed");
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-sm flex animate-fade-down flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 dark:bg-opacity-90 dark:text-gray-200 ">
          <h2 className="mb-4 text-2xl font-bold">Login</h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="w-52 md:w-72">
                <FormikInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  error={errors.email}
                  touched={touched.email}
                />
                <FormikInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={errors.password}
                  touched={touched.password}
                />
                <ShowPasswordCheckBox
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
                <SubmitButton text={"Login"} />
                <GoogleLoginButton googleLogin={googleLogin} />
                <FacebookLoginButton
                  responseFacebook={responseFacebook}
                  errorFacebook={errorFacebook}
                />
              </Form>
            )}
          </Formik>
          <p className="my-2">
            Not a user?{" "}
            <Link
              to={"/"}
              className="font-normal text-indigo-custom underline hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
