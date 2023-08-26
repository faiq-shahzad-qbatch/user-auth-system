import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";

import FormikInput from "../../../components/formUI/FormikInput";
import Joi from "joi";
import ShowPasswordCheckBox from "../../../components/formUI/ShowPasswordCheckBox";
import SubmitButton from "../../../components/buttons/SubmitButton";
import { ToastContext } from "../../../contexts/ToastContext";
import _ from "lodash";
import axiosInstance from "../../../utils/axiosUtils";
import getInvalidPasswordMessage from "../../../utils/getInvalidPasswordMessage";
import notifySlack from "../../../utils/notifySlack";
import validatePassword from "../../../utils/validatePassword";

function SignUpModal() {
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
    password: Joi.string().min(8).max(20).required().label("Password"),
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
        <div className="w-sm flex animate-fade-down flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 dark:bg-opacity-90 dark:text-gray-200">
          <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSignup}
          >
            {({ errors, touched }) => (
              <Form className="w-52 md:w-72">
                <FormikInput
                  name="name"
                  type="text"
                  placeholder="Name"
                  error={errors.name}
                  touched={touched.name}
                />
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
                <FormikInput
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
                <ShowPasswordCheckBox
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
                <SubmitButton text={"Sign Up"} />
              </Form>
            )}
          </Formik>
          <p className="my-2">
            Already a user?{" "}
            <Link
              to={"/login"}
              className=" w- font-normal text-indigo-custom underline hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUpModal;
