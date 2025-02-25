import {GameStateModel} from "../../models/GameStateModel.ts";

export interface GameStateServiceInterface {
    setGameState(gameState: GameStateModel): Promise<void>;
    getGameState(): Promise<GameStateModel | null>;
}