import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AuthGuard from "./components/AuthGuard";
import Notify from "./components/Notify";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ "./pages/HomePage"),
);
const LoginPage = lazy(() =>
  import(/* webpackChunkName: "LoginPage" */ "./pages/auth/LoginPage"),
);
const SignUpPage = lazy(() =>
  import(/* webpackChunkName: "SignUpPage" */ "./pages/auth/SignUpPage"),
);

function App() {
  const showLoader = useSelector((state) => state.userReducer.loading);
  return (
    <>
      <Spinner show={showLoader} />
      <Notify />
      <Suspense fallback={<Spinner />}>
        <Router>
          <AuthGuard>
            <Routes>
              <Route exact path="/" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </AuthGuard>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
