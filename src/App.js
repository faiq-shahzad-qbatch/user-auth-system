import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Notify from "./components/Notify";
import Spinner from "./components/Spinner";
import { ToastContext } from "./contexts/ToastContext";
import { toast } from "react-toastify";
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
      <ToastContext.Provider value={toast}>
        <Suspense fallback={<Spinner />}>
          <Router>
            <Routes>
              <Route exact path="/" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </Router>
        </Suspense>
      </ToastContext.Provider>
    </>
  );
}

export default App;
