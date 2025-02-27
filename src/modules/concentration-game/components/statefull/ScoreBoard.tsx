import { useContext, useEffect, useState } from "react";
import GameContext from "../../contexts/GameContext.ts";
import { GameScoreBoardDto } from "../../dtos/GameScoreBoardDto.ts";

const ScoreBoard = () => {
    const { gameScoreBoardData } = useContext(GameContext);
    const [gameScore, setGameScore] = useState<GameScoreBoardDto | null>(null);

    useEffect(() => {
        if (gameScoreBoardData) {
            setGameScore(gameScoreBoardData);
        }
    }, [gameScoreBoardData]);

    return (
        <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Memory Game</h1>
            <p className="text-lg">
                Player: <span className="font-semibold">{gameScore?.user?.name}</span>
            </p>
            <p className="text-lg mb-4">
                Matches: <span className="font-semibold">{gameScore?.matches}</span> - Attempts:{" "}
                <span className="font-semibold">{gameScore?.attempts}</span>
            </p>
        </div>
    );
};

export default ScoreBoard;
