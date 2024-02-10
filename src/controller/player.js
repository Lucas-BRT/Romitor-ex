import * as model from "../model";

async function getSelf() {
  return await model.localdata.getSelfData();
}

async function getPlayers() {
  return await model.metadata.get().then((data) => data.players);
}

async function register() {
  const player = await getSelf();
  if (player !== undefined) {
    player["state"] = "online";
    let players = await getPlayers();
    players = [...players, player];

    let metadata = await model.metadata.get();
    metadata.players = players;

    await model.metadata.set({ players: players });
  }
}

async function areRegisteredInTheRoom(playerId = "") {
  let players = await getPlayers();

  for (let i = 0; i < players.length; i++) {
    let player = players[i];

    if (player.id == playerId) {
      return true;
    }
  }

  return false;
}

async function getAllPlayersData() {
  let players = [];

  const selfData = await getSelfData();
  const otherPlayers = await getPlayersData();

  players.push(selfData, ...otherPlayers);

  renameRoles(players);

  return players;
}

async function setState(playerId = "", state = "") {
  let metadata = await model.metadata.get();

  for (let i = 0; i < metadata.players.length; i++) {
    let player = metadata.players[i];
    if (player.id == playerId) {
      player.state = state;
    }
  }
}

export {
  getSelf,
  getPlayers,
  register,
  areRegisteredInTheRoom,
  getAllPlayersData,
  setState,
};
