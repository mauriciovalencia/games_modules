import { GameScoreBoardModel } from "../models/GameScoreBoardModel.ts";
import { UserModel } from "../models/UserModel.ts";

export class GameScoreBoardDto implements GameScoreBoardModel {
    user: UserModel;
    attempts: number;
    matches: number;
    errors: number;

    constructor(data: Partial<GameScoreBoardModel> = {}) {
        this.user = data.user ?? { name: "Unknown" };
        this.attempts = data.attempts ?? 0;
        this.matches = data.matches ?? 0;
        this.errors = data.errors ?? 0;
    }
}
