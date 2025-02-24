import {GameStateModel} from "./GameStateModel.ts";

export interface GameBoardModel {
    gameState: GameStateModel;
    handleCardClick: (index: number) => void;
}