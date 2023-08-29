import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

// import { FacebookOAuthProvider } from "facebook-oauth-react";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  //   <FacebookOAuthProvider
  //     appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
  //     appVersion={"v17.0"}
  //   >
  <Provider store={store}>
    <App />
  </Provider>,
  //   </FacebookOAuthProvider>
  // </GoogleOAuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
