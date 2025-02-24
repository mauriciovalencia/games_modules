import {UserModel} from "./UserModel.ts";

export interface ScoreBoardModel {
    user: UserModel;
    attempts: number;
    matches: number;
}