import * as model from "../model";

async function getSelf() {
  return await getSelfData();
}

async function getPlayers() {
  return await model.metadata.getMetadata().then((data) => data.players);
}

async function addPlayer(player) {
  if (player !== undefined) {
    player["state"] = "online";
    let players = await getPlayers();
    players = [...players, player];

    let metadata = await getMetadata();
    metadata.players = players;

    await setRoomMetadata({ players: players });
  }
}

async function playerHasBeenAdded(playerId) {
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

export {
  getSelf,
  getPlayers,
  addPlayer,
  playerHasBeenAdded,
  getAllPlayersData,
};
