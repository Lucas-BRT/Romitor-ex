import OBR from "@owlbear-rodeo/sdk";

export const VERSION = "1.0.0";
export const METADATA_PATH = "com.romitor-ex/metadata";
export const DEFAULT_METADATA = {
  players: [],
};

export const getSelfData = async () => {
  const selfData = {
    name: await OBR.player.getName(),
    role: await OBR.player.getRole(),
    id: await OBR.player.getId(),
  };
  return selfData;
};

export const getPlayersData = async () => {
  const playersData = (await OBR.party.getPlayers()).map((player) => {
    const playerData = {
      name: player.name,
      role: player.role,
      id: player.id,
    };
    return playerData;
  });
  return playersData;
};

export const getRoomMetadata = async () => {
  return await OBR.room.getMetadata();
};

export const setRoomMetadata = async (data) => {
  await OBR.room.setMetadata({ [METADATA_PATH]: data });
};
