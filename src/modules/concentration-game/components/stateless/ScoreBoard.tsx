import {ScoreBoardModel} from "../../models/ScoreBoardModel.ts";

type ScoreBoardProps = {
    scoreBoardModel: ScoreBoardModel;
}

const ScoreBoard = ({scoreBoardModel}: ScoreBoardProps) => {
    const {user, attempts, matches} = scoreBoardModel;
    return (
        <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Memory Game</h1>
            <p className="text-lg">Player: <span className="font-semibold">{user.name}</span></p>
            <p className="text-lg mb-4">Matches: <span className="font-semibold">{matches}</span> - Attempts: <span
                className="font-semibold">{attempts}</span></p>
        </div>
    );
};

export default ScoreBoard;
