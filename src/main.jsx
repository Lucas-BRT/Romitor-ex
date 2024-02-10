import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./view/home";
import OBR from "@owlbear-rodeo/sdk";
import * as controller from "./controller";

OBR.onReady(async () => {
  console.clear();

  const metadataHasBeenCreated = await controller.haveMetadata();
  if (!metadataHasBeenCreated) {
    await controller.createMetadata();
  }

  const localPlayerData = await controller.player.getSelf();
  const registered = await controller.player.areRegisteredInTheRoom(
    localPlayerData.id,
  );

  if (!registered) {
    controller.player.register();
  } else {
    controller.player.setState(localPlayerData.id, "online");
  }

  await controller.events.onChange();

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
