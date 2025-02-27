import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConcentrationGameContainer from "./modules/concentration-game/ConcentrationGameContainer";
import GameSetup from "./modules/concentration-game/components/statefull/GameSetup.tsx";
import GameState from "./modules/concentration-game/contexts/GameState.tsx";

const AppRoutes = () => {
    return (
        <Router>
            <GameState>
                <Routes>
                    <Route path="/" element={<GameSetup />} />
                    <Route path="/game" element={<ConcentrationGameContainer />} />
                </Routes>
            </GameState>
        </Router>
    );
};

export default AppRoutes;
