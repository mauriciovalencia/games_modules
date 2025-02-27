import { UserModel } from "./UserModel.ts";

export interface GameScoreBoardModel {
    user: UserModel;
    attempts: number;
    matches: number;
    errors: number;
}
