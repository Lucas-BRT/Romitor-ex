import OBR from "@owlbear-rodeo/sdk";

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

export const renameRoles = (players) => {
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