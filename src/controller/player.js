import * as model from "../model";

async function getSelf() {
  return await model.localdata.getSelf();
}

async function getPlayers() {
  return await model.localdata.getPlayers().then((data) => data.players);
}

async function register() {
  const player = await getSelf();
  if (player !== undefined) {
    player["state"] = "online";
    let players = await model.metadata.get().then((data) => data.players);
    players = [...players, player];

    let metadata = await model.metadata.get();
    metadata.players = players;

    await model.metadata.set({ players: players });
  }
}

async function getMetadataPlayers() {
  return await model.metadata.get().then((data) => data.players);
}

async function areRegisteredInTheRoom(playerId = "") {
  let players = await model.metadata.get().then((response) => response.players);

  for (let i = 0; i < players.length; i++) {
    let player = players[i];

    if (player.id == playerId) {
      return true;
    }
  }

  return false;
}

function renameRoles(players) {
  players.map((player) => {
    switch (player.role) {
      case "GM":
        player.role = "Master";
        break;
      case "PLAYER":
        player.role = "Player";
        break;
    }
  });
}

async function getAllLocalPlayers() {
  let players = [];

  const selfData = await getSelf();
  const otherPlayers = await model.localdata.getPlayers();

  players.push(selfData, ...otherPlayers);

  renameRoles(players);

  return players;
}

async function setName(playerId = "", name = "") {
  let metadata = await model.metadata.get();

  for (let i = 0; i < metadata.players.length; i++) {
    let player = metadata.players[i];
    if (player.id == playerId) {
      player.name = name;
    }
  }

  await model.metadata.set(metadata);
}

async function setRole(playerId = "", role = "") {
  let metadata = await model.metadata.get();

  if (role === "Master") {
    role = "GM";
  } else {
    role = "PLAYER";
  }

  for (let i = 0; i < metadata.players.length; i++) {
    let player = metadata.players[i];
    if (player.id == playerId) {
      player.role = role;
    }
  }

  await model.metadata.set(metadata);
}

async function setState(playerId = "", state = "") {
  let metadata = await model.metadata.get();

  for (let i = 0; i < metadata.players.length; i++) {
    let player = metadata.players[i];
    if (player.id == playerId) {
      player.state = state;
    }
  }

  await model.metadata.set(metadata);
}

function findDiffPlayer(change) {
  let shortList = [];
  let longList = [];
  switch (change.changeType) {
    case "IN":
      shortList = change.onlinePlayers;
      longList = change.newOnlinePlayers;
      break;
    case "OUT":
      shortList = change.newOnlinePlayers;
      longList = change.onlinePlayers;
      break;
  }

  for (let i = 0; i < longList.length; i++) {
    let foundInShortList = false;
    for (let j = 0; j < shortList.length; j++) {
      if (longList[i].id == shortList[j].id) {
        foundInShortList = true;
        break;
      }
    }
    if (!foundInShortList) {
      return longList[i];
    }
  }
}

async function deletePlayer(playerId) {
  let metadata = await model.metadata.get();
  let playerList = [];

  for (let i = 0; i < metadata.players.length; i++) {
    if (metadata.players[i].id !== playerId) {
      playerList.push(metadata.players[i]);
    }
  }

  metadata.players = playerList;

  await model.metadata.set(metadata);
}

export {
  getSelf,
  getPlayers,
  register,
  getMetadataPlayers,
  areRegisteredInTheRoom,
  renameRoles,
  getAllLocalPlayers,
  setName,
  setRole,
  setState,
  findDiffPlayer,
  deletePlayer,
};
