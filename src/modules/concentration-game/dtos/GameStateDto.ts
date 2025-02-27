import { GameStateModel } from "../models/GameStateModel.ts";
import { UserModel } from "../models/UserModel.ts";
import { GameCardModel } from "../models/GameCardModel.ts";

export class GameStateDto implements GameStateModel {
    user: UserModel;
    attempts: number;
    matches: number;
    cards: GameCardModel[];
    flippedCards: number[];
    matchedCards: number[];
    isChecking: boolean;

    constructor(data: Partial<GameStateModel> = {}) {
        this.user = data.user ?? { name: "" };
        this.attempts = data.attempts ?? 0;
        this.matches = data.matches ?? 0;
        this.cards = data.cards ?? [];
        this.flippedCards = data.flippedCards ?? [];
        this.matchedCards = data.matchedCards ?? [];
        this.isChecking = data.isChecking ?? false;
    }
}
