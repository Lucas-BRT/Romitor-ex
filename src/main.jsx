import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./view/home";
import OBR from "@owlbear-rodeo/sdk";
import * as controller from "./controller";

OBR.onReady(async () => {
  console.clear();

  // await createMetadataIfNotExists();
  // const self = await getSelf();
  // const registered = await playerHasBeenAdded(self.id);
  // if (!registered) {
  //   await addPlayer(self);
  // } else {
  //   // TODO: handle automatically turn on the online state in the room metadata
  // }

  // const players = await getPlayers();

  // await onTeamChange(async (change) => {
  //   // console.log(change.newOnlinePlayers);

  //   console.log(await getPlayers());

  //   // ajustPopover(newPlayers.length);
  //   // handleNotifications();
  // });

  // // await ajustPopover(players.length);
  // // await handleNotifications();

  // onTeamMetadataChange(() => {});
  // // console.log(players);

  ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
});
