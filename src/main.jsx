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

  let amountOfPlayers = await controller.player
    .getMetadataPlayers()
    .then((players) => players.length);

  await controller.ajustPopover(amountOfPlayers);

  let lastChangedPlayer = {};

  controller.events.onChange(async (change) => {
    console.log(change);
    switch (change.changeType) {
      case "IN":
        lastChangedPlayer = {
          player: change.diffPlayer,
          changeType: change.changeType,
        };
        await controller.player.setState(change.diffPlayer.id, "online");
        break;
      case "OUT":
        lastChangedPlayer = {
          player: change.diffPlayer,
          changeType: change.changeType,
        };
        await controller.player.setState(change.diffPlayer.id, "offline");
        break;
      case "CHANGE-ROLE":
        break;
      case "RENAME":
        break;
      default:
        break;
    }
  });

  controller.events.onMetadataChange(async (change) => {
    const newAmountOfPlayers = change.players.length;
    if (newAmountOfPlayers !== amountOfPlayers) {
      await controller.ajustPopover(newAmountOfPlayers);
    }
    controller.notify.handleNotifications(
      lastChangedPlayer.player,
      lastChangedPlayer.changeType,
    );
  });

  ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
});
