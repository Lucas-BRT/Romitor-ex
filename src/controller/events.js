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
      for (let i = 0; i < change.onlinePlayers.length; i++) {
        const player = change.onlinePlayers[i];

        for (let j = 0; j < change.newOnlinePlayers.length; j++) {
          const newPlayer = change.newOnlinePlayers[j];
          if (player.id == newPlayer.id) {
            if (player.name !== newPlayer.name) {
              change.changeType = "RENAME";
              change.diffPlayer = newPlayer;
              action(change);
            }
            if (player.role !== newPlayer.role) {
              change.changeType = "CHANGE-ROLE";
              change.diffPlayer = newPlayer;
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
