import { Provider } from "react-redux";
import "./App.css";

import { GameBoardComponent } from "./features/game-board/game-board.component";
import { ScoreBoardComponent } from "./features/score-board/score-baord.component";
import { createStore } from "./store/store";

const App = () => {
  return (
    <div className="container">
      <Provider
        store={createStore({
          boardHeight: 300,
          boardWidth: 300,
          initialSnakeBlocks: 10,
          blockWidth: 10,
          level: 2,
        })}
      >
        <GameBoardComponent />
        <ScoreBoardComponent />
      </Provider>
    </div>
  );
};

export default App;
