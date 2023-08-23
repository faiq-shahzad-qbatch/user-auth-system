import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";

import Joi from "joi";
import { ToastContext } from "../contexts/ToastContext";
import _ from "lodash";
import axiosInstance from "../utils/axiosUtils";
import getInvalidPasswordMessage from "../utils/getInvalidPasswordMessage";
import notifySlack from "../utils/notifySlack";
import validatePassword from "../utils/validatePassword";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Joi.object({
    name: Joi.string()
      .max(20)
      .regex(/^[a-zA-Z ]+$/)
      .required()
      .label("Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .disallow("12345678", "Password123")
      .required()
      .label("Password"),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .label("Confirm Password")
      .messages({ "any.only": "Passwords do not match" }),
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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const toast = useContext(ToastContext);

  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleSignup(values, { setSubmitting }) {
    // Check if the password is valid
    const rules = validatePassword(values.password);
    if (!_.isEmpty(rules)) {
      const message = getInvalidPasswordMessage(rules);
      alert(
        `Your password fails to pass the following rule(s):\n\n${message} `,
      );
      return;
    }

    // If all is good then create the new user
    const body = {
      name: values.name.trim(),
      email: values.email,
      password: values.password,
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

    setSubmitting(false);
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="w-sm flex animate-fade-down flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSignup}
          >
            <Form className="max-w-xs">
              <div className="mb-2">
                <Field
                  name="name"
                  type="text"
                  className="mb-2 w-full rounded-md bg-[#94A3B8] p-2 placeholder:text-gray-700"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="animate-pulse text-sm text-red-500"
                />
              </div>
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
              <div className="mb-2">
                <Field
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className="mb-2 w-full rounded-md bg-[#94A3B8] p-2 placeholder:text-gray-700"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
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
                Sign Up
              </button>
            </Form>
          </Formik>
          <p className="my-2">
            Already a user?{" "}
            <Link
              to={"/login"}
              className=" font-normal text-pink-500 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
