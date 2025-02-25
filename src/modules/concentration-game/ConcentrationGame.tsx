import React, {useContext, useEffect} from "react";
import ScoreBoard from "./components/stateless/ScoreBoard.tsx";
import GameBoard from "./components/statefull/GameBoard.tsx";
import GameContext from "./contexts/GameContext.ts";
import {GameControllerInterface} from "./controllers/GameControllerInterface.ts";
import {container} from "./iocContainer.ts";

const ConcentrationGame: React.FC = () => {
    const gameController = container.resolve<GameControllerInterface>("GameController");
    const {state, dispatch} = useContext(GameContext);

    useEffect(() => {
        const initialize = async () => {
            await gameController.initializeGame();
            const gameBoardModel = await gameController.getGameBoard();
            dispatch({type: "INITIALIZE_GAME", payload: gameBoardModel.gameState.cards});
        };
        initialize();
    }, [dispatch]);

    if (!state) return <p>Loading...</p>;

    return (
        <React.Fragment>
            <ScoreBoard/>
            <GameBoard/>
            <button onClick={() => dispatch({type: "RESET_GAME"})}>Restart</button>
        </React.Fragment>
    );
};

export default ConcentrationGame;
