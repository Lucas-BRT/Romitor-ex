import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./view/home";
import OBR from "@owlbear-rodeo/sdk";

import {
  deleteMetadata,
  setMetadataToDefault,
  getMetadata,
} from "./controller";

OBR.onReady(async () => {
  console.clear();
  // await setMetadataToDefault();
  console.log(await getMetadata());
  // await deleteMetadata();

  ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
});
