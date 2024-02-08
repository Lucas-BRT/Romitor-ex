import { PlayersList } from "./components";
import {
  getAllPlayersData,
  onTeamSizeChange,
  setMetadataToDefault,
} from "../controller";

function Home() {
  return (
    <div className="home">
      <header>
        <a href="https://github.com/Lucas-BRT/Romitor-ex" target="_blank">
          Romitor-ex
        </a>
      </header>
      <div className="main-container">
        <PlayersList
          playersList={getAllPlayersData}
          trigger={onTeamSizeChange}
        />
      </div>
      <footer>
        <button className="delete-all-players" onClick={setMetadataToDefault}>
          DELETE DATA
        </button>
      </footer>
    </div>
  );
}

export default Home;
