import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Loader from "./components/Loader";
import { ToastContext } from "./contexts/ToastContext";
import { useSelector } from "react-redux";

const BackgroundImage = lazy(() => import("./components/BackgroundImage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const GoogleHomePage = lazy(() => import("./pages/GoogleHomePage"));
const FacebookHomePage = lazy(() => import("./pages/FacebookHomePage"));

function App() {
  const showLoader = useSelector((state) => state.loaderReducer.showLoader);
  return (
    <>
      <Loader show={showLoader} />
      <ToastContainer theme="colored" />
      <Suspense fallback={<Loader show={true} />}>
        <ToastContext.Provider value={toast}>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <BackgroundImage>
                    <SignUpPage />
                  </BackgroundImage>
                }
              />
              <Route
                path="/login"
                element={
                  <BackgroundImage>
                    <LoginPage />
                  </BackgroundImage>
                }
              />
              <Route path="/home" element={<HomePage />} />
              <Route path="/google" element={<GoogleHomePage />} />
              <Route path="/facebook" element={<FacebookHomePage />} />
            </Routes>
          </Router>
        </ToastContext.Provider>
      </Suspense>
    </>
  );
}

export default App;
