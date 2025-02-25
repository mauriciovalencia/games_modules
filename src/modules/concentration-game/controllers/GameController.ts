import {GameControllerInterface} from "./GameControllerInterface.ts";
import {GameStateModel} from "../models/GameStateModel.ts";
import {GameServiceInterface} from "../services/game/GameServiceInterface.ts";
import {GameService} from "../services/game/GameService.ts";
import {GameScoreBoardModel} from "../models/GameScoreBoardModel.ts";
import {GameBoardModel} from "../models/GameBoardModel.ts";

export class GameController implements GameControllerInterface {
    private gameState: GameStateModel;
    private gameBoard: GameBoardModel;
    private gameScoreBoard: GameScoreBoardModel;
    private gameService: GameServiceInterface;

    constructor() {
        this.gameService = new GameService();
    }

    private checkMatch() {
        const [firstIndex, secondIndex] = this.gameState.flippedCards;
        if (this.gameState.cards[firstIndex].base64 === this.gameState.cards[secondIndex].base64) {
            this.gameState.matchedCards.push(firstIndex, secondIndex);
            this.gameState.matches++;
        }
        this.gameState.attempts++;
        this.gameState.flippedCards = [];
    }

    handleCardClick(index: number) {
        console.log("handleCardClick", index);
        if (this.gameState.flippedCards.length === 2 || this.gameState.matchedCards.includes(index)) return;

        this.gameState.flippedCards.push(index);

        if (this.gameState.flippedCards.length === 2) {
            setTimeout(() => {
                this.checkMatch();
                // this.storageRepository.create(this.state);
            }, 800);
        }
    }

    async initGameState(): Promise<void> {
        this.gameState={
            user: { name: "Guest" },
            attempts: 0,
            matches: 0,
            cards: [],
            flippedCards: [],
            matchedCards: [],
        }
        await this.gameService.setGameState(this.gameState);
        this.gameState = await this.gameService.getGameState();
    }

    async initGameBoard() {
        this.gameBoard = {
            gameState: this.gameState,
        }
        await this.gameService.setGameBoard(this.gameBoard);
        this.gameBoard = await this.gameService.getGameBoard();
    }

    async initScoreBoard() {
        this.gameScoreBoard = {
            user: this.gameState?.user || { name: "Guest" },
            attempts: this.gameState?.attempts || 0,
            matches: this.gameState?.matches || 0,
        }
        await this.gameService.setGameScoreBoard(this.gameScoreBoard);
        this.gameScoreBoard = await this.gameService.getGameScoreBoard();
    }

    async initCardsGame(){
        await this.gameService.getImages();
        await this.gameService.setCards();
        this.gameState.cards = await this.gameService.getCards();
        this.gameBoard.gameState.cards = this.gameState.cards;
    }

    async initializeGame() {
        this.gameService.resetStorage();
        await this.initGameState();
        await this.initScoreBoard();
        await this.initGameBoard();
        if (this.gameState.cards.length === 0) {
            await this.initCardsGame();
        }
    }

    resetGame() {
        // this.storageRepository.resetOnLocalStorateBrowser();
        // this.game.resetStorage();
        // this.gameService.resetStorage();
        window.location.reload();
    }

    async setGameScoreBoard(scoreBoard: GameScoreBoardModel): Promise<void> {
        try {
            await this.gameService.setGameScoreBoard(scoreBoard);
        }catch (e) {
            console.error("Failed to set score board: ", e);
            throw new Error("Failed to set score board");
        }
    }

    async getGameScoreBoard(): Promise<GameScoreBoardModel> {
        try {
            return await this.gameService.getGameScoreBoard();
        }catch (e) {
            console.error("Failed to fetch score board: ", e);
            throw new Error("Failed to fetch score board");
        }
    }

    async setGameBoard(data:GameBoardModel): Promise<void> {
        try {
            await this.gameService.setGameBoard(data);
        }catch (e) {
            console.error(e);
        }
    }

    async getGameBoard(): Promise<GameBoardModel> {
        try {
            this.gameBoard = await this.gameService.getGameBoard();
            this.gameState.cards = await this.gameService.getCards();
            this.gameBoard.gameState.cards = this.gameState.cards;
            return this.gameBoard;
        }catch (e) {
            console.error(e);
            throw new Error("Failed to get game board");
        }
    }
}
