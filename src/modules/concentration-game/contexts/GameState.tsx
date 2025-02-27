import {useReducer} from "react";
import GameContext from "./GameContext";
import {
    GameContexStateType,
    GET_GAME_BOARD_DATA,
    GET_GAME_CARDS_DATA,
    GET_GAME_SCORE_BOARD_DATA,
    GET_GAME_STATE_DATA
} from "./Types";
import {GameCardDto} from "../dtos/GameCardDto.ts";
import {GameBoardDto} from "../dtos/GameBoardDto.ts";
import {GameScoreBoardDto} from "../dtos/GameScoreBoardDto.ts";
import {GameStateDto} from "../dtos/GameStateDto.ts";
import {container} from "../iocContainer.ts";
import {GameControllerInterface} from "../controllers/GameControllerInterface.ts";
import GameReducer from "./GameReducer.ts";
import {GameScoreBoardModel} from "../models/GameScoreBoardModel.ts";
import {GameStateModel} from "../models/GameStateModel.ts";

const GameState = (props: any) => {
    const gameController = container.resolve<GameControllerInterface>("GameController");
    const initialState: GameContexStateType = {

        // init game
        initGame: () => {
        },

        // cards
        gameCardsData: [new GameCardDto()],
        showGameCardsData: false,
        getGameCardsData: () => {
        },

        // board
        gameBoardData: new GameBoardDto(),
        showGameBoardData: true,
        getGameBoardData: () => {
        },

        // score board
        gameScoreBoardData: new GameScoreBoardDto(),
        showGameScoreBoardData: true,
        getGameScoreBoardData: () => {
        },

        // game state
        gameStateData: new GameStateDto(),
        showGameStateData: true,
        getGameStateModelData: () => {
        },
        setGameStateModelData: () => {

        },

        flipCard: () => {
        },
        resetGame: () => {
        }
    };

    const [state, dispatch] = useReducer(GameReducer, initialState);

    const initGame = async () => {
        const result = await gameController.initializeGame();
        const cards = await gameController.getGameCards();
        dispatch({type: GET_GAME_CARDS_DATA, payload: cards || [new GameCardDto()]})
        dispatch({type: GET_GAME_BOARD_DATA, payload: result || new GameBoardDto()})
        dispatch({type: GET_GAME_STATE_DATA, payload: result.gameState || new GameStateDto()})
        const gameScoreBoard: GameScoreBoardModel = {
            user: result.gameState.user,
            matches: result.gameState.matches,
            attempts: result.gameState.attempts,
            errors: result.gameState.errors,
        }
        dispatch({type: GET_GAME_SCORE_BOARD_DATA, payload: gameScoreBoard || new GameScoreBoardDto()})
    }

    const getGameCardsData = async () => {
        const response = await gameController.getGameCards();
        dispatch({type: GET_GAME_CARDS_DATA, payload: response || [new GameCardDto()]})
    }

    const getGameBoardData = async () => {
        const response = await gameController.getGameBoard();
        dispatch({type: GET_GAME_BOARD_DATA, payload: response.gameState || new GameBoardDto()})
    }

    const getGameScoreBoardData = async () => {
        const gameScoreBoard = await gameController.getGameScoreBoard();
        dispatch({type: GET_GAME_SCORE_BOARD_DATA, payload: gameScoreBoard || new GameScoreBoardDto()})
    }

    const getGameStateModelData = async () => {
        const gameState = await gameController.getGameState();
        dispatch({type: GET_GAME_STATE_DATA, payload: gameState || new GameStateDto()})
    }

    const setGameStateModelData = async (data: GameStateModel) => {
        try {
            await gameController.setGameState(data);
            const gameStateData: GameStateModel = await gameController.getGameState();
            const gameScoreBoard = new GameScoreBoardDto({
                user: gameStateData.user,
                matches: gameStateData.matches,
                attempts: gameStateData.attempts,
                errors: gameStateData.errors,
            })
            dispatch({type: GET_GAME_SCORE_BOARD_DATA, payload: gameScoreBoard || new GameScoreBoardDto()})
        } catch (e) {
            console.error(e);
            throw new Error("Failed to set game state");
        }
    }

    const flipCard = async (index: number) => {
        const result = await gameController.handleCardClick(index);

        dispatch({type: GET_GAME_BOARD_DATA, payload: result || new GameBoardDto()})
        dispatch({type: GET_GAME_STATE_DATA, payload: result.gameState || new GameStateDto()})
        const gameScoreBoard: GameScoreBoardModel = {
            user: result.gameState.user,
            matches: result.gameState.matches,
            attempts: result.gameState.attempts,
            errors: result.gameState.errors,
        }
        dispatch({type: GET_GAME_SCORE_BOARD_DATA, payload: gameScoreBoard || new GameScoreBoardDto()})
    }

    const resetGame = async () => {
        await gameController.resetGame();
    }

    return (
        <GameContext.Provider value={{

            // init game
            initGame,

            // cards
            gameCardsData: state.gameCardsData,
            showGameCardsData: state.showGameCardsData,
            getGameCardsData,

            // board
            gameBoardData: state.gameBoardData,
            showGameBoardData: state.showGameBoardData,
            getGameBoardData,

            // score board
            gameScoreBoardData: state.gameScoreBoardData,
            showGameScoreBoardData: state.showGameScoreBoardData,
            getGameScoreBoardData,

            // game state
            gameStateData: state.gameStateData,
            showGameStateData: state.showGameStateData,
            getGameStateModelData,
            setGameStateModelData,

            flipCard,
            resetGame,
        }}>
            {props.children}
        </GameContext.Provider>
    );
};

export default GameState;
