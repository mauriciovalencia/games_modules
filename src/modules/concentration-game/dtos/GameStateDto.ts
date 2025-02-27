import { GameStateModel } from "../models/GameStateModel.ts";
import { UserModel } from "../models/UserModel.ts";
import { GameCardModel } from "../models/GameCardModel.ts";

export class GameStateDto implements GameStateModel {
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

    constructor(data: Partial<GameStateModel> = {}) {
        this.user = data.user ?? { name: "" };
        this.attempts = data.attempts ?? 0;
        this.matches = data.matches ?? 0;
        this.errors = data.errors ?? 0;
        this.cards = data.cards ?? [];
        this.flippedCards = data.flippedCards ?? [];
        this.matchedCards = data.matchedCards ?? [];
        this.isChecking = data.isChecking ?? false;
        this.numRows = data.numRows ?? 4;
        this.numCols = data.numCols ?? 4;
        this.matchingSetSize = data.matchingSetSize ?? 2;
    }
}
