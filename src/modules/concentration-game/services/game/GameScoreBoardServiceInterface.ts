import {GameScoreBoardModel} from "../../models/GameScoreBoardModel.ts";

export interface GameScoreBoardServiceInterface {
    setScoreBoard(data: GameScoreBoardModel): Promise<void>;

    getScoreBoard(): Promise<GameScoreBoardModel>;

    updateSoreBoard(params: { key: string, data: GameScoreBoardModel }): Promise<void>;

    resetScoreBoard(): Promise<void>;
}