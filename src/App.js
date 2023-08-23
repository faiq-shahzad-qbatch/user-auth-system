import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Loader from "./components/Loader";
import { ToastContext } from "./contexts/ToastContext";
import { useSelector } from "react-redux";

const Container = lazy(() =>
  import(/* webpackChunkName: "Container" */ "./components/Container"),
);
const BackgroundImage = lazy(() =>
  import(
    /* webpackChunkName: "BackgroundImage" */ "./components/BackgroundImage"
  ),
);
const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ "./pages/HomePage"),
);
const LoginPage = lazy(() =>
  import(/* webpackChunkName: "LoginPage" */ "./pages/LoginPage"),
);
const SignUpPage = lazy(() =>
  import(/* webpackChunkName: "SignUpPage" */ "./pages/SignUpPage"),
);
const GoogleHomePage = lazy(() =>
  import(/* webpackChunkName: "GoogleHomePage" */ "./pages/GoogleHomePage"),
);
const FacebookHomePage = lazy(() =>
  import(/* webpackChunkName: "FacebookHomePage" */ "./pages/FacebookHomePage"),
);

function App() {
  const showLoader = useSelector((state) => state.loaderReducer.showLoader);
  return (
    <>
      <Loader show={showLoader} />
      <ToastContainer newestOnTop={true} theme="colored" />
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

              <Route
                path="/home"
                element={
                  <Container>
                    <HomePage />
                  </Container>
                }
              />
              <Route
                path="/google"
                element={
                  <Container>
                    <GoogleHomePage />
                  </Container>
                }
              />
              <Route
                path="/facebook"
                element={
                  <Container>
                    <FacebookHomePage />
                  </Container>
                }
              />
            </Routes>
          </Router>
        </ToastContext.Provider>
      </Suspense>
    </>
  );
}

export default App;
