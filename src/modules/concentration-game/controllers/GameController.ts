import {GameControllerInterface} from "./GameControllerInterface.ts";
import {GameStateModel} from "../models/GameStateModel.ts";
import {GameServiceInterface} from "../services/GameServiceInterface.ts";
import {GameService} from "../services/GameService.ts";
import {ScoreBoardModel} from "../models/ScoreBoardModel.ts";
import {GameBoardModel} from "../models/GameBoardModel.ts";

export class GameController implements GameControllerInterface {
    private gameState: GameStateModel;
    private gameBoard: GameBoardModel;
    private gameScoreBoard: ScoreBoardModel | undefined;
    private gameService: GameServiceInterface;

    // private imageService: ImageServiceInterface;

    constructor() {
        this.gameService = new GameService();
        // this.imageService = new ImageService();

        /* const savedState = this.storageRepository.localOnLocalStorageBrowser();
        this.state = savedState || {
            user: { name: "Guest" },
            attempts: 0,
            matches: 0,
            cards: [],
            flippedCards: [],
            matchedCards: [],
        }; */
        this.gameState = {
            user: {name: "Guest"},
            attempts: 0,
            matches: 0,
            cards: [],
            flippedCards: [],
            matchedCards: [],
        };
        this.gameBoard = {
            gameState: this.gameState,
            handleCardClick: this.handleCardClick,
        }
    }

    async initializeGame() {
        this.gameService.resetStorage();
        if (this.gameState.cards.length === 0) {
            // this.state.cards = await this.imageService.fetchImagesFromWebService()
            // this.storageRepository.saveOnLocalStorageBrowser(this.state);
        }
    }

    handleCardClick(index: number) {
        if (this.gameState.flippedCards.length === 2 || this.gameState.matchedCards.includes(index)) return;

        this.gameState.flippedCards.push(index);

        if (this.gameState.flippedCards.length === 2) {
            setTimeout(() => {
                this.checkMatch();
                // this.storageRepository.saveOnLocalStorageBrowser(this.state);
            }, 800);
        }
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

    getGameState(): GameStateModel {
        return this.gameState;
    }
    getGameBoard(): GameBoardModel {
        return this.gameBoard;
    }
    getScoreBoard(): ScoreBoardModel {
        return <ScoreBoardModel>this.gameScoreBoard;
    }

    resetGame() {
        // this.storageRepository.resetOnLocalStorateBrowser();
        // this.game.resetStorage();
        window.location.reload();
    }
}
