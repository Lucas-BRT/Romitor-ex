import { useState, useEffect } from "react";
import * as controller from "../controller";

function PlayersList() {
  let [players, setPlayers] = useState([]);

  useEffect(() => {
    const handlePlayersChanges = async () => {
      let players = await controller.player.getPlayers();
      console.log(players);
      await setPlayers(players);
    };

    return () => {
      handlePlayersChanges();
    };
  }, []);

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
  console.log(props);
  let classRole;
  let onlineState = state;

  switch (role) {
    case "Master":
      classRole = "master-role";
      break;
    case "Player":
      classRole = "player-role";
      break;
  }

  console.log(onlineState);

  return (
    <div id={id} className="player-container">
      <div className="player-name">{name}</div>
      <div className={`${classRole}`}>{role}</div>
      <div className={`${onlineState}`}></div>
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
  return (
    <footer>
      <button className="delete-all-players">DELETE DATA</button>
    </footer>
  );
}

export { PlayersList, PlayerContainer, Header, Footer };
