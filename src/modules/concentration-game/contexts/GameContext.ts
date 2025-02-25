import { createContext } from "react";
import { GameContextType } from "./Types";

const defaultValue: GameContextType = {
    state: {
        user: { name: "Player" },
        attempts: 0,
        matches: 0,
        cards: [],
        flippedCards: [],
        matchedCards: [],
    },
    dispatch: () => {} // No hace nada por defecto
};

const GameContext = createContext<GameContextType>(defaultValue);
export default GameContext;
