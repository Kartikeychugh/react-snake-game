import { Provider } from "react-redux";
import "./App.css";

import { GameBoardComponent } from "./features/game-board/game-board.component";
import { createStore } from "./store/store";
import { PastScoreBoardComponent } from "./features/score-board/past-score-board.component";

const App = () => {
  return (
    <div className="container">
      <Provider
        store={createStore({
          boardHeight: 500,
          boardWidth: 500,
          initialSnakeBlocks: 10,
          blockWidth: 15,
          level: 5,
        })}
      >
        <GameBoardComponent />
        <PastScoreBoardComponent />
      </Provider>
    </div>
  );
};

export default App;

/**
 * Score history
 * Support local storage
 * Host on firebase
 * Use firebase database to store scores
 * Incremental speed
 * Bonus fruits
 * Power ups
 */
