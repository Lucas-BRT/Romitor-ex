import { PlayersList, Header, Footer } from "./components";
import * as controller from "../controller";

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="main-container">
        <PlayersList />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
