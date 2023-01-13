import React from "react";
import ReactDOM from "react-dom/client";
import Todos from "./components/Todos";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Todos />
  </Provider>
);
