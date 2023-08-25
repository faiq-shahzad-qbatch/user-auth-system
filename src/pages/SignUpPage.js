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
      .regex(/^[a-zA-Z ]+$/, "alphabets only")
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
    setSubmitting(true);

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
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    };

    try {
      await axiosInstance.post("/users", body);
      navigate("/login");
      toast.success("Sign Up Successful!");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        toast.error(_.first(error?.response?.data?.message));
        notifySlack(JSON.stringify(error.response.data, null, 2));
      }
      toast.error("Sign Up Failed!");
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
            {({ errors, touched }) => (
              <Form className="w-52 md:w-72">
                <div
                  className={`${
                    errors.name && touched.name ? "animate-pulse" : ""
                  } mb-2`}
                >
                  <Field
                    name="name"
                    type="text"
                    className={`${
                      errors.name && touched.name
                        ? "border-2 border-red-500"
                        : ""
                    } mb-2 w-full rounded-md bg-gray-300 p-2 placeholder:text-gray-700`}
                    placeholder="Name"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
                <div
                  className={`${
                    errors.email && touched.email ? "animate-pulse" : ""
                  } mb-2`}
                >
                  <Field
                    name="email"
                    type="email"
                    className={`${
                      errors.email && touched.email
                        ? "border-2 border-red-500"
                        : ""
                    } mb-2 w-full rounded-md bg-gray-300 p-2 placeholder:text-gray-700`}
                    placeholder="Email"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className=" text-sm text-red-500"
                  />
                </div>
                <div
                  className={`${
                    errors.password && touched.password ? "animate-pulse" : ""
                  } mb-2`}
                >
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`${
                      errors.password && touched.password
                        ? "border-2 border-red-500"
                        : ""
                    } mb-2 w-full rounded-md bg-gray-300 p-2 placeholder:text-gray-700`}
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
                <div
                  className={`${
                    errors.confirmPassword && touched.confirmPassword
                      ? "animate-pulse"
                      : ""
                  } mb-2`}
                >
                  <Field
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className={`${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-2 border-red-500"
                        : ""
                    } mb-2 w-full rounded-md bg-gray-300 p-2 placeholder:text-gray-700`}
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-sm text-red-500"
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
                  className="my-2 w-full rounded-md bg-indigo-custom px-4 py-2 text-white hover:bg-indigo-500 hover:shadow-md"
                >
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
          <p className="my-2">
            Already a user?{" "}
            <Link
              to={"/login"}
              className=" font-normal text-indigo-custom underline hover:text-indigo-500"
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
