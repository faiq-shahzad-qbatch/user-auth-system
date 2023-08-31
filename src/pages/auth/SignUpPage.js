import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import AuthModal from "../../components/forms/AuthModal";
import BackgroundImage from "../../components/BackgroundImage";
import FormikInput from "../../components/forms/FormikInput";
import Joi from "joi";
import RedirectionLink from "../../components/forms/RedirectionLink";
import ShowPasswordCheckBox from "../../components/forms/ShowPasswordCheckBox";
import SubmitButton from "../../components/forms/SubmitButton";
import _ from "lodash";
import getInvalidPasswordMessage from "../../utils/getInvalidPasswordMessage";
import { signUpUser } from "../../redux/users/actionCreator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validatePassword from "../../utils/validatePassword";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.access_token;
    if (accessToken) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const validationSchema = Joi.object({
    firstName: Joi.string()
      .max(20)
      .regex(/^(?=.*[a-zA-Z])[a-zA-Z ]+$/, "alphabets only")
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .max(20)
      .regex(/^(?=.*[a-zA-Z])[a-zA-Z ]+$/, "alphabets only")
      .required()
      .label("Last Name"),
    username: Joi.string().alphanum().max(20).required().label("Username"),
    password: Joi.string().min(8).max(50).required().label("Password"),
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
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

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
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      username: values.username,
      password: values.password,
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    };

    dispatch(signUpUser(body, navigate));

    setSubmitting(false);
  }

  return (
    <>
      <BackgroundImage>
        <AuthModal text={"Sign Up"}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSignup}
          >
            {({ errors, touched }) => (
              <Form className="w-52 md:w-96">
                <div className="item-center flex min-w-full justify-between space-x-2">
                  <FormikInput
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    error={errors.firstName}
                    touched={touched.firstName}
                  />
                  <FormikInput
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    error={errors.lastName}
                    touched={touched.lastName}
                  />
                </div>

                <FormikInput
                  name="username"
                  type="text"
                  placeholder="Username"
                  error={errors.username}
                  touched={touched.username}
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
          <RedirectionLink
            linkText={"Already a user?"}
            redirectTo={"/login"}
            pageTitle={"Login"}
          />
        </AuthModal>
      </BackgroundImage>
    </>
  );
}

export default SignUpPage;
