import {
  getSelfData,
  getPlayersData,
  METADATA_PATH,
  setRoomMetadata,
  DEFAULT_METADATA,
  getRoomMetadata,
} from "../model";
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
  let changeStatus;

  OBR.party.onChange(async () => {
    const newOnlinePlayers = await getAllPlayersData();
    const newOnlinePlayersSize = newOnlinePlayers.length;

    if (onlinePlayersSize !== newOnlinePlayersSize) {
      changeStatus =
        onlinePlayersSize < newOnlinePlayersSize ? "ENTERED" : "EXITED";

      onlinePlayers = newOnlinePlayers;
      onlinePlayersSize = newOnlinePlayersSize;
      action(onlinePlayers, changeStatus);
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

export const notify = async (mensage, changeState) => {
  const NOTIFICATION_DELAY = 500;
  let notificationId;

  switch (changeState) {
    case "ENTERED":
      notificationId = await OBR.notification.show(mensage, "SUCCESS");
      break;
    case "EXITED":
      notificationId = await OBR.notification.show(mensage, "ERROR");
      break;
  }

  setTimeout(async () => {
    await OBR.notification.close(notificationId);
  }, NOTIFICATION_DELAY);
};

export const deleteMetadata = async () => {
  setRoomMetadata(undefined);
};

export const getMetadata = async () => {
  let metadata = await getRoomMetadata();
  return metadata[METADATA_PATH];
};

export const setMetadataToDefault = async () => {
  const defaultMetadata = {
    players: [],
  };
  await OBR.room.setMetadata({ [METADATA_PATH]: defaultMetadata });
};
