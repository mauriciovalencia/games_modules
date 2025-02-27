import {createContext} from "react";
import {GameContexStateType} from "./Types";
import {GameCardDto} from "../dtos/GameCardDto.ts";
import {GameBoardDto} from "../dtos/GameBoardDto.ts";
import {GameScoreBoardDto} from "../dtos/GameScoreBoardDto.ts";
import {GameStateDto} from "../dtos/GameStateDto.ts";

const GameContext = createContext<GameContexStateType>({
    // init game
    initGame: () => {
    },

    // cards
    gameCardsData: [new GameCardDto()],
    showGameCardsData: false,
    getGameCardsData: () => {
    },

    // board
    gameBoardData: new GameBoardDto(),
    showGameBoardData: false,
    getGameBoardData: () => {
    },

    // score board
    gameScoreBoardData: new GameScoreBoardDto(),
    showGameScoreBoardData: false,
    getGameScoreBoardData: () => {
    },

    // game state
    gameStateData: new GameStateDto(),
    showGameStateData: false,
    getGameStateModelData: () => {
    },
    setGameStateModelData: () => {
    },

    flipCard: () => {
    },
    resetGame: () => {
    },
});
export default GameContext;
