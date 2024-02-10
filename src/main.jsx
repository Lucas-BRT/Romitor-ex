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

  let amountOfPlayers = controller.player
    .getMetadataPlayers()
    .then((players) => players.length);

  controller.events.onChange(async (change) => {
    const diffPlayer = await controller.player.findDiffPlayer(change);
    switch (change.changeType) {
      case "IN":
        await controller.player.setState(diffPlayer.id, "online");
        break;
      case "OUT":
        await controller.player.setState(diffPlayer.id, "offline");
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
  });

  ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
});
