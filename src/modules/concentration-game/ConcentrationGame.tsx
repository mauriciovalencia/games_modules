import React, {useContext, useEffect} from "react";
import GameBoard from "./components/statefull/GameBoard.tsx";
import GameContext from "./contexts/GameContext.ts";
import ScoreBoard from "./components/statefull/ScoreBoard.tsx";
import {useNavigate} from "react-router-dom";
import styles from "./ConcentrationGame.module.css";

const ConcentrationGame = () => {
    const {showGameScoreBoardData, showGameBoardData, initGame, resetGame} = useContext(GameContext);
    const navigate = useNavigate();

    useEffect(() => {
        initGame();
    }, []);

    const handleResetGame = async () => {
        resetGame()
        navigate("/");
    }

    return (
        <React.Fragment>
            <div className={styles["concentration-game"]}>
                {showGameScoreBoardData && <ScoreBoard/>}
                {showGameBoardData && <GameBoard/>}

                <button className={styles["concentration-game__button"]} onClick={handleResetGame}>
                    Restart Game
                </button>
            </div>
        </React.Fragment>
    );
};

export default ConcentrationGame;
