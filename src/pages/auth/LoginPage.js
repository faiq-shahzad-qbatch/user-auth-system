import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import AuthModal from "../../components/forms/AuthModal";
import BackgroundImage from "../../components/BackgroundImage";
import FacebookLoginButton from "../../components/buttons/FacebookLoginButton";
import FormikInput from "../../components/forms/FormikInput";
import GoogleLoginButton from "../../components/buttons/GoogleLoginButton";
import Joi from "joi";
import RedirectionLink from "../../components/forms/RedirectionLink";
import ShowPasswordCheckBox from "../../components/forms/ShowPasswordCheckBox";
import SubmitButton from "../../components/forms/SubmitButton";
import { loginUser } from "../../redux/users/actionCreator";
import playNotification from "../../utils/playNotification";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useFacebookLogin } from "facebook-oauth-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function LoginPage() {
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

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleLogin(values, { setSubmitting }) {
    setSubmitting(true);

    const body = {
      username: values.username,
      password: values.password,
    };

    dispatch(loginUser(body, navigate));

    setSubmitting(false);
  }

  function responseGoogle(tokenResponse) {
    localStorage.setItem("access_token", tokenResponse.access_token);
    localStorage.setItem("loginMethod", "google");
    navigate("/");
    toast.success("Google login successful!");
    playNotification();
  }

  function errorGoogle() {
    toast.error("Google login failed!");
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: errorGoogle,
  });

  function responseFacebook(response) {
    localStorage.setItem("access_token", response.accessToken);
    localStorage.setItem("loginMethod", "facebook");
    navigate("/");
    toast.success("Facebook login successful!");
    playNotification();
  }

  const facebookLogin = useFacebookLogin({ onSuccess: responseFacebook });

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
                <GoogleLoginButton googleLogin={googleLogin} />
                <FacebookLoginButton facebookLogin={facebookLogin} />
              </Form>
            )}
          </Formik>
          <RedirectionLink
            linkText={"Not a user?"}
            redirectTo={"/signup"}
            pageTitle={"Sign Up"}
          />
        </AuthModal>
      </BackgroundImage>
    </>
  );
}

export default LoginPage;
