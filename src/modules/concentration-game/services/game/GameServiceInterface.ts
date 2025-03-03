import {GameStateModel} from "../../models/GameStateModel.ts";
import {GameScoreBoardModel} from "../../models/GameScoreBoardModel.ts";
import {GameBoardModel} from "../../models/GameBoardModel.ts";
import {GameCardModel} from "../../models/GameCardModel.ts";
import {ImageModel} from "../../models/ImageModel.ts";

export interface GameServiceInterface {
    resetStorage(): void;

    getImages(): Promise<ImageModel[]>;

    getCards(): Promise<GameCardModel[]>;
    buildGameCards(): Promise<GameCardModel[]>;

    //setCard(card: GameCardModel): void;
    //setCardMatched(card: GameCardModel): void;
    //setCardFlipped(card: GameCardModel): void;

    setGameState(gameState: GameStateModel): Promise<void>;

    getGameState(): Promise<GameStateModel>;

    setGameScoreBoard(scoreBoard: GameScoreBoardModel): Promise<void>;

    getGameScoreBoard(): Promise<GameScoreBoardModel>;

    setGameBoard(data:GameBoardModel): Promise<void>;

    getGameBoard(): Promise<GameBoardModel>;
}