import { GameStateModel } from "../models/GameStateModel.ts";

export interface GameControllerInterface {
    initializeGame(): Promise<void>;
    handleCardClick(index: number): void;
    resetGame(): void;
    getGameState(): GameStateModel;
}
