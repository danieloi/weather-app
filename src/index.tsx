import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./containers/Root";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./store/configureStore";

import reportWebVitals from "./reportWebVitals";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Root store={store} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your Root, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
