import { useContext } from "react";
import GameContext from "../../contexts/GameContext.ts";

const ScoreBoard = () => {
    const { state } = useContext(GameContext); // ⬅ Extraemos el estado global

    return (
        <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Memory Game</h1>
            <p className="text-lg">Player: <span className="font-semibold">{state.user.name}</span></p>
            <p className="text-lg mb-4">Matches: <span className="font-semibold">{state.matches}</span> - Attempts: <span
                className="font-semibold">{state.attempts}</span></p>
        </div>
    );
};

export default ScoreBoard;
