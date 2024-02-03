import { getSelfData } from "../model";
import { getPlayersData } from "../model";
import OBR from "@owlbear-rodeo/sdk";

export const getAllPlayersData = async () => {
  let players = [];

  const selfData = await getSelfData();
  const otherPlayers = await getPlayersData();

  players.push(selfData, ...otherPlayers);

  renameRoles(players);

  return players;
};

export const onTeamSizeChange = async (action = () => {}) => {
  let onlinePlayers = await getAllPlayersData();
  let onlinePlayersSize = onlinePlayers.length;

  OBR.party.onChange(async () => {
    const newOnlinePlayers = await getAllPlayersData();
    const newOnlinePlayersSize = newOnlinePlayers.length;

    if (onlinePlayersSize !== newOnlinePlayersSize) {
      onlinePlayers = newOnlinePlayers;
      onlinePlayersSize = newOnlinePlayersSize;
      action(onlinePlayers);
    }
  });
};

const renameRoles = (players) => {
  players.map((player) => {
    switch (player.role) {
      case "GM":
        player.role = "Master";
        break;
      case "PLAYER":
        player.role = "Player";
        break;
      default:
        break;
    }
  });
};
