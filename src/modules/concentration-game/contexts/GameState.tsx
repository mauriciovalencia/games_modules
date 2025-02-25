import React, {useReducer} from "react";
import GameContext from "./GameContext";
import {gameReducer} from "./GameReducer";
import {GameStateModel} from "./Types";

const initialState: GameStateModel = {
    user: {name: "Player"},
    attempts: 0,
    matches: 0,
    cards: [],
    flippedCards: [],
    matchedCards: [],
};

const GameState: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{state, dispatch}}>
            {children}
        </GameContext.Provider>
    );
};

export default GameState;
