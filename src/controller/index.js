import OBR from "@owlbear-rodeo/sdk";
import * as events from "./events";
import * as notify from "./notify";
import * as player from "./player";
import * as model from "../model";

const NOTIFICATION_DELAY = 500;

async function haveMetadata() {
  let metadata = await model.metadata.get();

  if (metadata === undefined) {
    return false;
  }
  return true;
}

async function renameRoles(players) {
  players.map((player) => {
    switch (player.role) {
      case "GM":
        player.role = "Master";
        break;
      case "PLAYER":
        player.role = "Player";
        break;
    }
  });
}

async function ajustPopover(playersAmount = 1) {
  const playerSpace = 40;
  const baseheight = 85;

  const totalheight = playerSpace * playersAmount + baseheight;
  await OBR.action.setHeight(totalheight);
}

async function createMetadata() {
  model.metadata.resetMetadata();
}

export {
  events,
  notify,
  player,
  haveMetadata,
  renameRoles,
  ajustPopover,
  createMetadata,
};
