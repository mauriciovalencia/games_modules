import ConcentrationGame from "./ConcentrationGame.tsx";
import GameState from "./contexts/GameState.tsx";

const ConcentrationGameContainer = () => {
    return (
        <GameState>
        <ConcentrationGame/>
        </GameState>
    )
}
export default ConcentrationGameContainer;