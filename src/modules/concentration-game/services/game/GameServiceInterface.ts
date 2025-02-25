import {GameStateModel} from "../../models/GameStateModel.ts";
import {GameScoreBoardModel} from "../../models/GameScoreBoardModel.ts";
import {GameBoardModel} from "../../models/GameBoardModel.ts";
import {CardModel} from "../../models/CardModel.ts";
import {ImageModel} from "../../models/ImageModel.ts";

export interface GameServiceInterface {
    resetStorage(): void;

    getImages(): Promise<ImageModel[]>;

    getCards(): Promise<CardModel[]>;
    setCards(): Promise<CardModel[]>;

    //setCard(card: CardModel): void;
    //setCardMatched(card: CardModel): void;
    //setCardFlipped(card: CardModel): void;

    setGameState(gameState: GameStateModel): Promise<void>;

    getGameState(): Promise<GameStateModel>;

    setGameScoreBoard(scoreBoard: GameScoreBoardModel): Promise<void>;

    getGameScoreBoard(): Promise<GameScoreBoardModel>;

    setGameBoard(data:GameBoardModel): Promise<void>;

    getGameBoard(): Promise<GameBoardModel>;
}