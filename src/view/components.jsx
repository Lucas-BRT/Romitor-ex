import { useState, useEffect } from "react";
import * as controller from "../controller";

function PlayersList() {
  let [players, setPlayers] = useState(null);

  useEffect(() => {
    async function handlePlayersChanges() {
      const playersOnMetadata = await controller.player.getMetadataPlayers();
      setPlayers(playersOnMetadata);

      await controller.events.onMetadataChange(async () => {
        await setPlayers(await controller.player.getMetadataPlayers());
      });
    }

    handlePlayersChanges();
  }, []);

  if (!players) {
    return <div>loading...</div>;
  }

  return (
    <div className="players_list">
      {players.map((player) => (
        <PlayerContainer
          name={player.name}
          role={player.role}
          key={player.id}
          id={player.id}
          state={player.state}
        />
      ))}
    </div>
  );
}

function PlayerContainer(props) {
  const { name, role, id, state } = props;
  let classRole;
  let onlineState = state;

  switch (role) {
    case "GM":
      classRole = "master-role";
      break;
    case "PLAYER":
      classRole = "player-role";
      break;
  }

  return (
    <div id={id} className="player-container">
      <div className="online-state-container">
        <div className={`online-status-${state}`}> </div>
      </div>
      <div className="player-name">{name}</div>
      <div className={`${classRole}`}>{role}</div>
      <button className="delete-player">X</button>
    </div>
  );
}

function Header() {
  return (
    <header>
      <a href="https://github.com/Lucas-BRT/Romitor-ex" target="_blank">
        Romitor-ex
      </a>
    </header>
  );
}

function Footer() {
  async function resetMetadata() {
    await controller.resetMetadata();
    await controller.ajustPopover(1);
  }

  return (
    <footer>
      <button className="delete-all-players" onClick={resetMetadata}>
        DELETE DATA
      </button>
    </footer>
  );
}

export { PlayersList, PlayerContainer, Header, Footer };
