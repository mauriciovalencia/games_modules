import React, {useContext, useEffect} from "react";
import GameBoard from "./components/statefull/GameBoard.tsx";
import GameContext from "./contexts/GameContext.ts";
import ScoreBoard from "./components/statefull/ScoreBoard.tsx";

const ConcentrationGame = () => {
    const {showGameScoreBoardData, showGameBoardData, initGame} = useContext(GameContext);

    useEffect(() => {
        initGame();
    }, []);

    return (
        <React.Fragment>
            {showGameScoreBoardData && <ScoreBoard/>}
            {showGameBoardData && <GameBoard/>}
            {/*<button onClick={() => dispatch({type: "RESET_GAME"})}>Restart</button>*/}
        </React.Fragment>
    );
};

export default ConcentrationGame;
