import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const BackgroundImage = lazy(() => import("./components/BackgroundImage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const Loader = lazy(() => import("./components/Loader"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader show={true} />}>
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
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
