import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import GameContext from "../../contexts/GameContext.ts";
import {GameStateDto} from "../../dtos/GameStateDto.ts";
import styles from "./GameSetup.module.css";

const GameSetup = () => {
    const {setGameStateModelData} = useContext(GameContext);
    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState("");
    const [gridSize, setGridSize] = useState({rows: 4, cols: 4});

    const handleGridSizeSelect = (rows: number, cols: number) => {
        setGridSize({rows, cols});
    };

    const handleStartGame = async () => {
        if (!playerName.trim()) {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        const initStateSetup = new GameStateDto({
            user: {name: playerName},
            numRows: gridSize.rows,
            numCols: gridSize.cols,
        })
        setGameStateModelData(initStateSetup);

        navigate("/game");
    };

    return (
        <div className={styles["game-setup"]}>
            <h2 className={styles["game-setup__title"]}>Game Setup</h2>

            <label className={styles["game-setup__label"]}>Player Name:</label>
            <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name..."
                className={styles["game-setup__input"]}
            />

            <h3 className={styles["game-setup__subtitle"]}>Select Grid Size:</h3>
            <div className={styles["game-setup__grid-options"]}>
                <button className={styles["game-setup__button"]} onClick={() => handleGridSizeSelect(4, 4)}>4x4</button>
                <button className={styles["game-setup__button"]} onClick={() => handleGridSizeSelect(6, 6)}>6x6</button>
                <button className={styles["game-setup__button"]} onClick={() => handleGridSizeSelect(8, 8)}>8x8</button>
            </div>

            <p className={styles["game-setup__selected-grid"]}>Selected Grid: {gridSize.rows} x {gridSize.cols}</p>

            <button className={styles["game-setup__start-button"]} onClick={handleStartGame}>
                Start Game
            </button>
        </div>

    );
};

export default GameSetup;
