import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./theme/global.css";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import ReactGA from "react-ga";

const container = document.getElementById("root");
const root = createRoot(container!);
ReactGA.initialize("UA-262836784-1");

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
