import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./view/home";
import OBR from "@owlbear-rodeo/sdk";

import {
  deleteMetadata,
  setMetadataToDefault,
  getMetadata,
  createMetadataIfNotExists,
  getPlayers,
} from "./controller";

OBR.onReady(async () => {
  console.clear();
  await createMetadataIfNotExists();

  console.log(await getMetadata());
  console.log(await getPlayers());

  ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
});
