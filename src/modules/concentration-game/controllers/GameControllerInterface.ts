import {GameScoreBoardModel} from "../models/GameScoreBoardModel.ts";
import {GameBoardModel} from "../models/GameBoardModel.ts";

export interface GameControllerInterface {
    initializeGame(): Promise<void>;

    handleCardClick(index: number): void;

    resetGame(): void;

    //getGameState(): Promise<GameStateModel>;

    getGameBoard(): Promise<GameBoardModel>;
    setGameBoard(data:GameBoardModel): Promise<void>;

    getGameScoreBoard(): Promise<GameScoreBoardModel>;
    setGameScoreBoard(scoreBoard: GameScoreBoardModel): Promise<void>;
}
