import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./view/home";
import OBR from "@owlbear-rodeo/sdk";

import {
  getMetadata,
  createMetadataIfNotExists,
  addPlayer,
  playerHasBeenAdded,
  getSelf,
} from "./controller";

OBR.onReady(async () => {
  console.clear();

  await createMetadataIfNotExists();

  const self = await getSelf();
  const registered = await playerHasBeenAdded(self.id);
  if (!registered) {
    await addPlayer(self);
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
});
