import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Contacts from "./components/Contacts";
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Contacts />
  </Provider>
);
