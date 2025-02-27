import {GameScoreBoardModel} from "../models/GameScoreBoardModel.ts";
import {GameBoardModel} from "../models/GameBoardModel.ts";
import {GameCardModel} from "../models/GameCardModel.ts";
import {GameStateModel} from "../models/GameStateModel.ts";

export interface GameControllerInterface {
    // init game
    initializeGame(): Promise<GameBoardModel>;

    // reset game
    resetGame(): void;

    // click on card
    handleCardClick(index: number): Promise<GameBoardModel>;

    // game cards
    getGameCards(): Promise<GameCardModel[]>;

    // game state
    getGameState(): Promise<GameStateModel>;
    setGameState(data:GameStateModel): Promise<void>;

    // game board
    getGameBoard(): Promise<GameBoardModel>;
    setGameBoard(data:GameBoardModel): Promise<void>;

    // game score board
    getGameScoreBoard(): Promise<GameScoreBoardModel>;
    setGameScoreBoard(scoreBoard: GameScoreBoardModel): Promise<void>;
}
