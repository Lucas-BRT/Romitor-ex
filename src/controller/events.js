import OBR from "@owlbear-rodeo/sdk";
import { player } from ".";
import * as model from "../model";

async function onChange(action = () => {}) {
  let change = {};
  change.onlinePlayers = await player.getAllLocalPlayers();

  OBR.party.onChange(async (obrChange) => {
    change.newOnlinePlayers = await player.getAllLocalPlayers();

    if (change.onlinePlayers.length !== change.newOnlinePlayers.length) {
      if (change.onlinePlayers.length < change.newOnlinePlayers.length) {
        change.changeType = "IN";
      } else {
        change.changeType = "OUT";
      }
      change.diffPlayer = player.findDiffPlayer(change);

      action(change);
    } else {
      player.renameRoles(obrChange);
      for (let i = 0; i < obrChange.length; i++) {
        for (let j = 0; j < change.onlinePlayers.length; j++) {
          if (obrChange[i].id === change.onlinePlayers[j].id) {
            if (obrChange[i].role !== change.onlinePlayers[j].role) {
              change.diffPlayer = obrChange[i];
              change.changeType = "CHANGE-ROLE";
              action(change);
            }
            if (obrChange[i].name !== change.onlinePlayers[j].name) {
              change.diffPlayer = obrChange[i];
              change.changeType = "RENAME";
              action(change);
            }
          }
        }
      }
    }
    change.onlinePlayers = change.newOnlinePlayers;
  });
}

async function onMetadataChange(action = () => {}) {
  OBR.room.onMetadataChange((change) => {
    action(change[model.METADATA_PATH]);
  });
}

export { onChange, onMetadataChange };
