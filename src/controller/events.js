import OBR from "@owlbear-rodeo/sdk";
import { player } from ".";
import * as model from "../model";

async function onChange(action = () => {}) {
  let onlinePlayers = await player.getAllLocalPlayers();
  let change = {
    onlinePlayers: onlinePlayers,
  };

  OBR.party.onChange(async (obrChange) => {
    const newOnlinePlayers = await player.getAllLocalPlayers();
    change.newOnlinePlayers = newOnlinePlayers;

    if (onlinePlayers.length !== newOnlinePlayers.length) {
      if (onlinePlayers.length < newOnlinePlayers.length) {
        change.changeType = "IN";
      } else {
        change.changeType = "OUT";
      }

      action(change);
    } else {
      // TODO: handle changes on the players data structure, like renaeming, etc.
      player.renameRoles(obrChange);

      for (let i = 0; i < obrChange.length; i++) {
        for (let j = 0; j < onlinePlayers.length; j++) {
          if (obrChange[i].id === onlinePlayers[j].id) {
            if (obrChange[i].role !== onlinePlayers[j].role) {
              change.changeType = "CHANGE-ROLE";
            }
            if (obrChange[i].name !== onlinePlayers[j].name) {
              change.changeType = "RENAME";
            }
          }
        }
      }
    }
    onlinePlayers = newOnlinePlayers;
  });
}

async function onMetadataChange(action = () => {}) {
  OBR.room.onMetadataChange((change) => {
    action(change[model.METADATA_PATH]);
  });
}

export { onChange, onMetadataChange };
