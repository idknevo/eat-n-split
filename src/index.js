import React from "react";
import ReactDom from "react-dom/client";
import "./style.scss";
import App from "./components/App";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
