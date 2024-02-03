import { useState, useEffect } from "react";
import OBR from "@owlbear-rodeo/sdk";

const getPlayers = async () => {
  let players = [];

  const selfPlayer = {
    name: await OBR.player.getName(),
    role: await OBR.player.getRole(),
    id: await OBR.player.getId(),
  };

  const otherPlayers = (await OBR.party.getPlayers()).map((player) => {
    const playerData = {
      name: player.name,
      role: player.role,
      id: player.id,
    };
    return playerData;
  });

  players.push(selfPlayer, ...otherPlayers);

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

  return players;
};

const PlayersList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      let playersData = await getPlayers();
      OBR.party.onChange(async () => {
        playersData = await getPlayers();
        setPlayers(playersData);
      });
      setPlayers(playersData);
    };

    fetchPlayers();
  }, []);

  return (
    <div className="players_list">
      {players.map(
        (player) => (
          <PlayerContainer
            name={player.name}
            role={player.role}
            key={player.id}
            id={player.id}
          />
        ),
        // console.log(player.name, player.role, player.id),
      )}
    </div>
  );
};

const PlayerContainer = (props) => {
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

function Home() {
  return (
    <div>
      <header>Romitor-ex</header>
      <div className="main-container">
        <PlayersList />
      </div>
    </div>
  );
}

export default Home;
