import { Form, Formik } from "formik";
import React, { useState } from "react";

import AuthModal from "../../components/forms/AuthModal";
import BackgroundImage from "../../components/BackgroundImage";
import FormikInput from "../../components/forms/FormikInput";
import Joi from "joi";
import RedirectionLink from "../../components/forms/RedirectionLink";
import ShowPasswordCheckBox from "../../components/forms/ShowPasswordCheckBox";
import SubmitButton from "../../components/forms/SubmitButton";
import { loginUser } from "../../redux/users/actionCreator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { ToastContext } from "../../contexts/ToastContext";

// import { setFacebookUserData } from "../../redux/users/actionCreator";

// import FacebookLoginButton from "../../components/buttons/FacebookLoginButton";

// import GoogleLoginButton from "../../components/buttons/GoogleLoginButton";

// import playNotification from "../../utils/playNotification";

// import { useGoogleLogin } from "@react-oauth/google";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = Joi.object({
    username: Joi.string().alphanum().max(20).required().label("Username"),
    password: Joi.string().min(8).max(50).required().label("Password"),
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
    username: "",
    password: "",
  };

  // const toast = useContext(ToastContext);

  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleLogin(values, { setSubmitting }) {
    setSubmitting(true);

    const body = {
      username: values.username,
      password: values.password,
    };

    dispatch(loginUser(body, navigate));

    setSubmitting(false);
  }

  // async function responseGoogle(tokenResponse) {
  //   localStorage.setItem("access_token", tokenResponse.access_token);
  //   localStorage.setItem("loginMethod", "google");
  //   navigate("/home");
  //   toast.success("Google Login Successful!");
  //   playNotification();
  // }

  // function errorGoogle() {
  //   toast.error("Google Login Failed!");
  // }

  // const googleLogin = useGoogleLogin({
  //   onSuccess: responseGoogle,
  //   onError: errorGoogle,
  // });

  // function responseFacebook(response) {
  //   dispatch(setFacebookUserData(response));
  //   localStorage.setItem("loginMethod", "facebook");
  //   navigate("/home");
  //   toast.success("Facebook Login Successful!");
  //   playNotification();
  // }

  // function errorFacebook() {
  //   toast.error("Facebook Login Failed");
  // }

  return (
    <>
      <BackgroundImage>
        <AuthModal text={"Login"}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="w-52 md:w-72">
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
                <ShowPasswordCheckBox
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
                <SubmitButton text={"Login"} />
                {/* <GoogleLoginButton googleLogin={googleLogin} />
                <FacebookLoginButton
                  responseFacebook={responseFacebook}
                  errorFacebook={errorFacebook}
                /> */}
              </Form>
            )}
          </Formik>
          <RedirectionLink
            linkText={"Not a user?"}
            redirectTo={"/"}
            pageTitle={"Sign Up"}
          />
        </AuthModal>
      </BackgroundImage>
    </>
  );
}

export default LoginPage;
