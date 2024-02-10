import OBR from "@owlbear-rodeo/sdk";
import { player } from ".";

async function onChange(action = () => {}) {
  let onlinePlayers = await player.getLocalPlayers();
  let change = {};

  OBR.party.onChange(async () => {
    const newOnlinePlayers = await player.getLocalPlayers();

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
  let metadata = await getMetadata();

  OBR.room.onMetadataChange((change) => {
    console.log(change);
  });
}

export { onChange, onMetadataChange };
