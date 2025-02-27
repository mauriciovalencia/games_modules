import {GameCardModel} from "../models/GameCardModel.ts";
import {GameBoardModel} from "../models/GameBoardModel.ts";
import {GameScoreBoardModel} from "../models/GameScoreBoardModel.ts";
import {GameStateModel} from "../models/GameStateModel.ts";

export type GameContexStateType = {

    // init game
    initGame: () => void;

    // cards
    gameCardsData: [GameCardModel];
    showGameCardsData: boolean;
    getGameCardsData: () => void;

    // board
    gameBoardData: GameBoardModel;
    showGameBoardData: boolean;
    getGameBoardData: () => void;

    // score board
    gameScoreBoardData: GameScoreBoardModel;
    showGameScoreBoardData: boolean;
    getGameScoreBoardData: () => void;

    // game state
    gameStateData: GameStateModel;
    showGameStateData: boolean;
    getGameStateModelData: () => void;

    flipCard:(index:number) => void;
    matchCard:() => void;
}

export const GET_GAME_CARDS_DATA = "GET_GAME_CARDS_DATA";
export const GET_GAME_BOARD_DATA = "GET_GAME_BOARD_DATA";
export const GET_GAME_SCORE_BOARD_DATA = "GET_GAME_SCORE_BOARD_DATA";
export const GET_GAME_STATE_DATA = "GET_GAME_STATE_DATA";
export const CARD_FLIP_ACTION = "CARD_FLIP_ACTION";
export const CARD_MATCH_ACTION = "CARD_MATCH_ACTION";