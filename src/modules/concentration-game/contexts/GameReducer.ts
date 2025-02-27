import {
    CARD_FLIP_ACTION, CARD_MATCH_ACTION,
    GameContexStateType,
    GET_GAME_BOARD_DATA,
    GET_GAME_CARDS_DATA,
    GET_GAME_SCORE_BOARD_DATA,
    GET_GAME_STATE_DATA,
} from "./Types.ts";

const GameReducer = (
    state: GameContexStateType,
    action: { payload: any; type: string }
) => {
    const {payload, type} = action;
    switch (type) {
        case GET_GAME_CARDS_DATA:
            return {
                ...state,
                gameCardsData: payload,
            };
        case GET_GAME_BOARD_DATA:
            return {
                ...state,
                gameBoardData: payload,
            };
        case GET_GAME_SCORE_BOARD_DATA:
            return {
                ...state,
                gameScoreBoardData: payload,
            };
        case GET_GAME_STATE_DATA:
            return {
                ...state,
                gameStateData: payload,
            };
        case CARD_FLIP_ACTION:
            return {
                ...state,
                gameStateData: payload,
            };
        case CARD_MATCH_ACTION:
            return {
                ...state,
                gameStateData: payload,
            };
        default:
            return state;
    }
}

export default GameReducer;
