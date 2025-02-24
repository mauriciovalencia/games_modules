import { CardModel } from "./CardModel.ts";
import {UserModel} from "./UserModel.ts";

export interface GameStateModel {
    user: UserModel;
    attempts: number;
    matches: number;
    cards: CardModel[];
    flippedCards: number[];
    matchedCards: number[];
}
