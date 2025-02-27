import { GameCardModel } from "./GameCardModel.ts";
import {UserModel} from "./UserModel.ts";

export interface GameStateModel {
    user: UserModel;
    attempts: number;
    matches: number;
    errors: number;
    cards: GameCardModel[];
    flippedCards: number[];
    matchedCards: number[];
    isChecking: boolean;
    numRows: number;
    numCols: number;
    matchingSetSize: number;
}
