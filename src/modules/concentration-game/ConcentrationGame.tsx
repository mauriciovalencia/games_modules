import React, { useEffect } from "react";

import { GameControllerInterface } from "./controllers/GameControllerInterface";
import {container} from "./iocContainer.ts";
import ScoreBoard from "./components/stateless/ScoreBoard.tsx";

const ConcentrationGame: React.FC = () => {
    const gameController = container.resolve<GameControllerInterface>("GameController");

    useEffect(() => {
        const initialize = async () => {
            await gameController.initializeGame();
        };
        initialize();
    }, [gameController]);

    return (
        <>
            <ScoreBoard scoreBoardModel={gameController.getGameState()} />
            {/*<GameBoard {...gameController.getGameState()} handleCardClick={gameController.handleCardClick.bind(gameController)} />*/}
            <button onClick={() => gameController.resetGame()}>Restart</button>
        </>
    );
};

export default ConcentrationGame;