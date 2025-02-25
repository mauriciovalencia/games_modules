import {GameAction, GameStateModel} from "./Types";

export const gameReducer = (state: GameStateModel, action: GameAction): GameStateModel => {
    switch (action.type) {
        case "INITIALIZE_GAME":
            return {
                ...state,
                cards: action.payload, // Actualiza las cartas
            };

        case "FLIP_CARD":
            return {
                ...state,
                flippedCards: [...state.flippedCards, action.payload],
            };

        case "MATCH_CARDS":
            return {
                ...state,
                matchedCards: [...state.matchedCards, ...state.flippedCards],
                flippedCards: [],
                matches: state.matches + 1,
            };

        case "RESET_GAME":
            return {
                ...state,
                attempts: 0,
                matches: 0,
                flippedCards: [],
                matchedCards: [],
                cards: [], // Esto debería llenarse al reiniciar
            };

        default:
            return state;
    }
};
