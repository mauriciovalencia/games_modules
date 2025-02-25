import {GameBoardModel} from "../../models/GameBoardModel.ts";

export interface GameBoardServiceInterface {
    setGameBoard(data: GameBoardModel): Promise<void>;

    getGameBoard(): Promise<GameBoardModel | undefined>;
}