import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./view/home";
import OBR from "@owlbear-rodeo/sdk";

OBR.onReady(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
});
