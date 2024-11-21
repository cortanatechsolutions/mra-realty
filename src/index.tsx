import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { HashRouter } from "react-router-dom";

const secretRecaptchaKey = import.meta.env.VITE_REACT_APP_RECAPTCHA_KEY;

if (!secretRecaptchaKey) {
  throw new Error("Recaptcha key is not defined");
}

library.add(fab); // Add FontAwesome brand icons to the library

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={secretRecaptchaKey} // Replace with your reCAPTCHA site key
    >
      <HashRouter>
        <App />
      </HashRouter>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
