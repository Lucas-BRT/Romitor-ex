import OBR from "@owlbear-rodeo/sdk";
import { player } from ".";
import * as model from "../model";

async function onChange(action = () => {}) {
  let onlinePlayers = await player.getAllLocalPlayers();
  let change = {};

  OBR.party.onChange(async () => {
    const newOnlinePlayers = await player.getAllLocalPlayers();

    if (onlinePlayers.length !== newOnlinePlayers.length) {
      change = {
        onlinePlayers: onlinePlayers,
        newOnlinePlayers: newOnlinePlayers,
      };

      if (onlinePlayers.length < newOnlinePlayers.length) {
        change.changeType = "IN";
      } else {
        change.changeType = "OUT";
      }

      action(change);
      onlinePlayers = newOnlinePlayers;
    } else {
      // TODO: handle changes on the players data structure, like renaeming, etc.
    }
  });
}

async function onMetadataChange(action = () => {}) {
  OBR.room.onMetadataChange((change) => {
    action(change[model.METADATA_PATH]);
  });
}

export { onChange, onMetadataChange };
