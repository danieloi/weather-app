import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Root from "./containers/Root";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./store/configureStore";

import reportWebVitals from "./reportWebVitals";

const { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Root store={store} persistor={persistor} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your Root, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
