// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";      // ← import this
import App from "./App";
 import { Provider } from "react-redux";
 import store from "./redux/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
     <BrowserRouter>                                     {/* ← wrap here */}
    <App />
  </BrowserRouter>
  </Provider>
);
