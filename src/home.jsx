export const PlayerContainer = (props) => {
  const { name, role } = props;
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
    <div className="player-container">
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
        <ul className="players_list">
          <PlayerContainer name="Nimb" role="Master" />
          <PlayerContainer name="Jhon Carter" role="Player" />
          <PlayerContainer name="Eric Withliz" role="Player" />
        </ul>
      </div>
    </div>
  );
}

export default Home;
