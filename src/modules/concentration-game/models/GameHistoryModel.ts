import {UserModel} from "./UserModel.ts";

export interface GameHistoryModel {
    user: UserModel;
    date: string;
    attempts: number;
    matches: number;
}
