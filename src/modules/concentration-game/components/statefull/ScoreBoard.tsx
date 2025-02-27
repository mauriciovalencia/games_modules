import {useContext, useEffect, useState} from "react";
import GameContext from "../../contexts/GameContext.ts";
import styles from "./ScoreBoard.module.css";

const ScoreBoard = () => {
    const [user, setUser] = useState<string | null>(null);
    const [isGameWon, setIsGameWon] = useState(false);
    const {gameScoreBoardData, gameStateData} = useContext(GameContext);

    useEffect(() => {
        if (gameScoreBoardData?.user?.name) {
            setUser(gameScoreBoardData.user.name);
        }
    }, [gameScoreBoardData]);

    useEffect(() => {
        const totalPairs = (gameStateData.numRows * gameStateData.numCols) / gameStateData.matchingSetSize;
        if (gameScoreBoardData?.matches === totalPairs) {
            setIsGameWon(true);
        }
    }, [gameScoreBoardData?.matches, gameStateData]);

    return (
        <div className={styles["score-board"]}>
            <h1 className={styles["score-board__title"]}>Memory Game</h1>

            <p className={styles["score-board__player"]}>
                Player: <span className={styles["score-board__player-name"]}>{user || "Loading..."}</span>
            </p>

            <p className={styles["score-board__stats"]}>
                Matches: <span className={styles["score-board__stat-value"]}>{gameScoreBoardData?.matches ?? 0}</span> -
                Errors: <span className={styles["score-board__stat-value"]}>{gameScoreBoardData?.errors ?? 0}</span> -
                Attempts: <span className={styles["score-board__stat-value"]}>{gameScoreBoardData?.attempts ?? 0}</span>
            </p>

            {isGameWon && (
                <div className={styles["score-board__congratulations"]}>
                    🎉 Congratulations, {user}! You have found all the pairs. 🎉
                </div>
            )}
        </div>

    );
};

export default ScoreBoard;
