import OBR from "@owlbear-rodeo/sdk";
import * as events from "./events";
import * as notify from "./notify";
import * as player from "./player";
import * as model from "../model";

async function haveMetadata() {
  let metadata = await model.metadata.get();

  if (metadata === undefined) {
    return false;
  }
  return true;
}

async function ajustPopover(playersAmount = 1) {
  const playerSpace = 40;
  let baseheight = 85;
  if (playersAmount < 1) {
    baseheight = 90;
    playersAmount = 0;
  }

  const totalheight = playerSpace * playersAmount + baseheight;
  await OBR.action.setHeight(totalheight);
}

async function createMetadata() {
  await model.metadata.reset();
}

async function resetMetadata() {
  await model.metadata.reset();
}

export {
  events,
  notify,
  player,
  haveMetadata,
  ajustPopover,
  createMetadata,
  resetMetadata,
};
