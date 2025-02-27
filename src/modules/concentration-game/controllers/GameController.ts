import {GameControllerInterface} from "./GameControllerInterface.ts";
import {GameServiceInterface} from "../services/game/GameServiceInterface.ts";
import {GameService} from "../services/game/GameService.ts";
import {GameCardModel} from "../models/GameCardModel.ts";
import {GameScoreBoardModel} from "../models/GameScoreBoardModel.ts";
import {GameStateModel} from "../models/GameStateModel.ts";
import {GameBoardModel} from "../models/GameBoardModel.ts";

export class GameController implements GameControllerInterface {
    private gameStateModel: GameStateModel;
    private gameCardModels: GameCardModel[];
    private gameBoardModel: GameBoardModel;
    private gameScoreBoardModel: GameScoreBoardModel;
    private gameService: GameServiceInterface;

    constructor() {
        this.gameService = new GameService();
        this.gameStateModel = {
            user: {name: ""},
            attempts: 0,
            matches: 0,
            cards: [],
            flippedCards: [],
            matchedCards: [],
        }
        this.gameBoardModel = {
            gameState: this.gameStateModel,
        }
        this.gameScoreBoardModel = {
            user: this.gameStateModel.user,
            attempts: this.gameStateModel.attempts,
            matches: this.gameStateModel.matches,
        }
    }

    private async checkMatch() {
        const [firstIndex, secondIndex] = this.gameStateModel.flippedCards;
        console.log("FIRST_INDEX", firstIndex, "SECOND_INDEX", secondIndex);
        console.log("IMAGE_1", this.gameCardModels[firstIndex].name);
        console.log("IMAGE_2", this.gameCardModels[secondIndex].name);

        if (this.gameCardModels[firstIndex].base64 === this.gameCardModels[secondIndex].base64) {
            this.gameStateModel.matchedCards.push(firstIndex, secondIndex);
            this.gameStateModel.matches++;
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // ⏳ Espera 1 segundo
        }

        this.gameStateModel.flippedCards = [];
        await this.setGameState(this.gameStateModel);
    }


    async initializeGame(): Promise<GameBoardModel> {
        try {
            this.gameService.resetStorage(); // reset storage
            await this.setGameBoard(this.gameBoardModel); // save game
            await this.setGameScoreBoard(this.gameScoreBoardModel); // save scoreboard
            await this.gameService.buildGameCards(); // make each card of game based on images web-service response
            return this.gameBoardModel;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to init game");
        }
    }

    async resetGame() {
        // window.location.reload();
        await this.initializeGame();
    }

    async handleCardClick(index: number): Promise<GameBoardModel> {
        if (
            this.gameStateModel.flippedCards.length === 2 ||
            this.gameStateModel.matchedCards.includes(index) ||
            this.gameStateModel.isChecking
        ) {
            return this.gameBoardModel;
        }

        this.gameStateModel.flippedCards.push(index);

        if (this.gameStateModel.flippedCards.length === 2) {
            this.gameStateModel.isChecking = true;

            setTimeout(async () => {
                this.gameCardModels = await this.getGameCards();

                const [firstIndex, secondIndex] = this.gameStateModel.flippedCards;
                const firstCard = this.gameCardModels[firstIndex];
                const secondCard = this.gameCardModels[secondIndex];

                if (firstCard.base64 === secondCard.base64) {
                    this.gameStateModel.matches++;
                    this.gameStateModel.matchedCards.push(firstIndex, secondIndex);
                }

                this.gameStateModel.attempts++;
                this.gameStateModel.flippedCards = [];

                await this.setGameState(this.gameStateModel);

                this.gameBoardModel.gameState = this.gameStateModel;
                this.gameScoreBoardModel.matches = this.gameStateModel.matches;
                this.gameScoreBoardModel.attempts = this.gameStateModel.attempts;
                await this.setGameScoreBoard(this.gameScoreBoardModel);

                this.gameStateModel.isChecking = false;
            }, 200);
        }

        return this.gameBoardModel;
    }

    async setGameState(data: GameStateModel): Promise<void> {
        try {
            await this.gameService.setGameState(data);
        } catch (e) {
            console.error(e);
        }
    }

    async getGameState(): Promise<GameStateModel> {
        try {
            return await this.gameService.getGameState();
        } catch (e) {
            console.error(e);
            throw new Error("Failed to get game state");
        }
    }

    async setGameBoard(data: GameBoardModel): Promise<void> {
        try {
            await this.gameService.setGameBoard(data);
        } catch (e) {
            console.error(e);
        }
    }

    async getGameBoard(): Promise<GameBoardModel> {
        try {
            this.gameBoardModel = await this.gameService.getGameBoard();
            return this.gameBoardModel;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to get game board");
        }
    }

    async setGameScoreBoard(scoreBoard: GameScoreBoardModel): Promise<void> {
        try {
            await this.gameService.setGameScoreBoard(scoreBoard);
        } catch (e) {
            console.error("Failed to set score board: ", e);
            throw new Error("Failed to set score board");
        }
    }

    async getGameScoreBoard(): Promise<GameScoreBoardModel> {
        try {
            return await this.gameService.getGameScoreBoard();
        } catch (e) {
            console.error("Failed to fetch score board: ", e);
            throw new Error("Failed to fetch score board");
        }
    }

    async getGameCards(): Promise<GameCardModel[]> {
        const cards = await this.gameService.getCards();

        if (cards.length < 2) {
            console.warn("Se necesitan al menos 2 cartas para generar pares.");
            return [];
        }

        // set grid
        const rows = 8;
        const cols = 8;
        const totalCardsNeeded = rows * cols;

        // adjust cards number if not it's enough
        while (cards.length * 2 < totalCardsNeeded) {
            cards.push(...cards.slice(0, totalCardsNeeded / 2 - cards.length));
        }

        // Duplicate & mix cards
        let pairedCards = [...cards, ...cards].slice(0, totalCardsNeeded).map((card, index) => ({
            ...card,
            id: index.toString(),
        }));

        pairedCards = pairedCards.sort(() => Math.random() - 0.5);

        // assign images in pairs
        for (let i = 0; i < pairedCards.length; i += 2) {
            const testImageId = pairedCards[i].imageId;
            const testBase64 = pairedCards[i].base64;

            pairedCards[i].imageId = testImageId;
            pairedCards[i].base64 = testBase64;

            pairedCards[i + 1].imageId = testImageId;
            pairedCards[i + 1].base64 = testBase64;
        }

        return pairedCards;
    }

}
