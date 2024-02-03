import { useState, useEffect } from "react";
import { getAllPlayersData, onTeamSizeChange } from "../../controller";

export const PlayersList = () => {
  let [players, setPlayers] = useState([]);

  useEffect(() => {
    const handlePlayersChanges = async () => {
      setPlayers(await getAllPlayersData());
      onTeamSizeChange((onlinePlayers) => {
        setPlayers(onlinePlayers);
      });
    };

    handlePlayersChanges();
  }, []);

  return (
    <div className="players_list">
      {players.map((player) => (
        <PlayerContainer
          name={player.name}
          role={player.role}
          key={player.id}
          id={player.id}
        />
      ))}
    </div>
  );
};

export const PlayerContainer = (props) => {
  const { name, role, id } = props;
  let class_role;

  switch (role) {
    case "Master":
      class_role = "master-role";
      break;
    case "Player":
      class_role = "player-role";
      break;
  }

  return (
    <div id={id} className="player-container">
      <div className="player-name">{name}</div>
      <div className={`${class_role}`}>{role}</div>
    </div>
  );
};
