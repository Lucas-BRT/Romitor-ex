import { getSelfData } from "../model";
import { getPlayersData } from "../model";
import OBR from "@owlbear-rodeo/sdk";
import { renameRoles } from "../model";

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
