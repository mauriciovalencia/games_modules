import {StorageRepositoryInterface} from "../../repositories/storage/StorageRepositoryInterface.ts";
import {StorageRepository} from "../../repositories/storage/StorageRepository.ts";
import {GameServiceInterface} from "./GameServiceInterface.ts";
import {CardService} from "../cards/CardService.ts";
import {CardServiceInterface} from "../cards/CardServiceInterface.ts";
import {GameStateModel} from "../../models/GameStateModel.ts";
import {GameStateServiceInterface} from "./GameStateServiceInterface.ts";
import {GameStateService} from "./GameStateService.ts";
import {GameScoreBoardModel} from "../../models/GameScoreBoardModel.ts";
import {GameScoreBoardServiceInterface} from "./GameScoreBoardServiceInterface.ts";
import {GameScoreBoardService} from "./GameScoreBoardService.ts";
import {GameBoardModel} from "../../models/GameBoardModel.ts";
import {GameBoardServiceInterface} from "./GameBoardServiceInterface.ts";
import {GameBoardService} from "./GameBoardService.ts";
import {CardModel} from "../../models/CardModel.ts";
import {ImageServiceInterface} from "../image/ImageServiceInterface.ts";
import {ImageService} from "../image/ImageService.ts";
import {ImageModel} from "../../models/ImageModel.ts";

export class GameService implements GameServiceInterface {

    private storage: StorageRepositoryInterface<never>
    private imageService: ImageServiceInterface;
    private cardService: CardServiceInterface;
    private gameStateService: GameStateServiceInterface;
    private gameScoreBoardService: GameScoreBoardServiceInterface;
    private gemeBoardService: GameBoardServiceInterface;

    constructor() {
        this.storage = new StorageRepository();
        this.imageService = new ImageService();
        this.cardService = new CardService();
        this.gameStateService = new GameStateService();
        this.gameScoreBoardService = new GameScoreBoardService();
        this.gemeBoardService = new GameBoardService();
    }

    resetStorage() {
        try {
            this.storage.resetStorage();
        } catch (e) {
            console.error("Failed to reset storage: ", e);
            throw new Error("Failed to reset storage");
        }

    }

    async getImages(): Promise<ImageModel[]> {
        try {
            const imagesResult = await this.imageService.fetchImagesFromWebService();
            if (!imagesResult) {
                throw new Error("Failed to get images");
            }
            return imagesResult;
        } catch (e) {
            console.error("Failed to get images: ", e);
            throw new Error("Failed to get images");
        }
    }

    async setCards(): Promise<CardModel[]> {
        try {
            const cards = await this.cardService.createCards();
            if (!cards) {
                throw new Error("Failed to set cards");
            }
            return cards;
        } catch (e) {
            console.error("Failed to set cards: ", e);
            throw new Error("Failed to set cards");
        }
    }
    async getCards(): Promise<CardModel[]> {
        try {
            return await this.cardService.getCards();
        }catch (e) {
            console.error("Failed to get cards: ", e);
            throw new Error("Failed to get cards");
        }
    }

    async setGameState(gameState: GameStateModel): Promise<void> {
        try {
            await this.gameStateService.setGameState(gameState);
        } catch (e) {
            console.error("Failed to set game state: ", e);
            throw new Error("Failed to set game state");
        }
    }

    async getGameState(): Promise<GameStateModel> {
        try {
            const stateResult = await this.gameStateService.getGameState();
            if (!stateResult) {
                throw new Error("Failed to get game state");
            }
            return stateResult;
        } catch (e) {
            console.error("Failed to get game state: ", e);
            throw new Error("Failed to get game state");
        }
    }

    async setGameScoreBoard(scoreBoard: GameScoreBoardModel): Promise<void> {
        try {
            return this.gameScoreBoardService.setScoreBoard(scoreBoard);
        } catch (e) {
            console.error("Failed to set score board: ", e);
            throw new Error("Failed to set score board");
        }
    }

    async getGameScoreBoard(): Promise<GameScoreBoardModel> {
        try {
            return this.gameScoreBoardService.getScoreBoard();
        } catch (e) {
            console.error("Failed to get score board: ", e);
            throw new Error("Failed to get score board");
        }
    }

    async setGameBoard(data:GameBoardModel): Promise<void> {
        try {
            await this.gemeBoardService.setGameBoard(data);
        }catch (e) {
            console.error(e);
        }
    }

    async getGameBoard(): Promise<GameBoardModel> {
        try {
            const gameBoard = await this.gemeBoardService.getGameBoard();
            if (!gameBoard) {
                throw new Error("Failed to get game board");
            }
            return gameBoard;
        }catch (e) {
            console.error(e);
            throw new Error("Failed to get game board");
        }
    }


}