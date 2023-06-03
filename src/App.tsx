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
          boardWidth: 700,
          initialSnakeBlocks: 10,
          blockWidth: 15,
          level: 2,
        })}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            boxShadow: "0 0 8px lightgrey",
          }}
        >
          <GameBoardComponent />
          <PastScoreBoardComponent />
        </div>
      </Provider>
    </div>
  );
};

export default App;

/**
 * Support local storage
 * Host on firebase
 * Use firebase database to store scores
 * Bonus fruits
 * Power ups
 */
