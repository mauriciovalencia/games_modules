import {UserModel} from "../models/UserModel.ts";
import {CardModel} from "../models/CardModel.ts";

export interface GameStateModel {
    user: UserModel;
    attempts: number;
    matches: number;
    cards: CardModel[];
    flippedCards: number[];
    matchedCards: number[];
}

// Tipo de acciones para el reducer
export type GameAction =
    | { type: "INITIALIZE_GAME"; payload: CardModel[] }
    | { type: "FLIP_CARD"; payload: number }
    | { type: "MATCH_CARDS" }
    | { type: "RESET_GAME" };

// Definir el tipo del contexto
export interface GameContextType {
    state: GameStateModel;
    dispatch: React.Dispatch<GameAction>;
}
