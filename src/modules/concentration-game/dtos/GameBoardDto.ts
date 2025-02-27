import {GameBoardModel} from "../models/GameBoardModel.ts";
import {GameStateModel} from "../models/GameStateModel.ts";

export class GameBoardDto implements GameBoardModel {
    gameState: GameStateModel;

    constructor(data: Partial<GameBoardModel> = {}) {
        this.gameState = data.gameState ?? {
            user: {name: ""},
            attempts: 0,
            matches: 0,
            errors: 0,
            cards: [],
            flippedCards: [],
            matchedCards: [],
            numRows: 4,
            numCols: 4,
            matchingSetSize: 2,
            isChecking: false,
        };
    }
}
