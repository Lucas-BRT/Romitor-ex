async function onTeamChange(action = () => {}) {
  let onlinePlayers = await getAllPlayersData();

  OBR.party.onChange(async () => {
    const newOnlinePlayers = await getAllPlayersData();

    if (onlinePlayers.length !== newOnlinePlayers.length) {
      const change = {
        onlinePlayers: onlinePlayers,
        newOnlinePlayers: newOnlinePlayers,
      };

      action(change);
      onlinePlayers = newOnlinePlayers;
    }
  });
}

async function onTeamMetadataChange(action = () => {}) {
  let metadata = await getMetadata();

  OBR.room.onMetadataChange((change) => {
    console.log(change);
  });
}

async function onTeamSizeChange(action = () => {}) {
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

      await ajustPopover(onlinePlayersSize);
      action(onlinePlayers, changeStatus);
    }
  });
}

export { onTeamChange, onTeamMetadataChange, onTeamSizeChange };
