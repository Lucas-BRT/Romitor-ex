import OBR from "@owlbear-rodeo/sdk";

async function getSelf() {
  const selfData = {
    name: await OBR.player.getName(),
    role: await OBR.player.getRole(),
    id: await OBR.player.getId(),
  };
  return selfData;
}

async function getPlayers() {
  const playersData = (await OBR.party.getPlayers()).map((player) => {
    const playerData = {
      name: player.name,
      role: player.role,
      id: player.id,
    };
    return playerData;
  });
  return playersData;
}

export { getSelf, getPlayers };
