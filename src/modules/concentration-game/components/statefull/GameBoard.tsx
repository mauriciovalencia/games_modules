import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import GameContext from "../../contexts/GameContext.ts";


const GameBoard = () => {
    const { state, dispatch } = useContext(GameContext);

    if (!state.cards || state.cards.length === 0) {
        return <p>Cargando cartas...</p>;
    }

    const handleCardClick = (index: number) => {
        dispatch({ type: "FLIP_CARD", payload: index });
    };

    /*useEffect(() => {
        console.log("Cartas actualizadas:", state.cards);
    }, [state.cards]);*/

    const numCards = state.cards.length;
    const gridSize = numCards > 0 ? Math.ceil(Math.sqrt(numCards)) : 4;

    return (
        <div
            className="grid gap-2 w-full max-w-screen-md mx-auto bg-blue-200 p-4 rounded-lg shadow-lg border border-gray-600"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridSize}, 100px)`,
                gridTemplateRows: `repeat(${Math.ceil(numCards / gridSize)}, 100px)`,
                gap: "8px",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "500px",
                minWidth: `${gridSize * 100 + (gridSize - 1) * 8}px`,
            }}
        >
            {state.cards.map((card, index) => (
                <motion.div
                    key={index}
                    className="flex items-center justify-center cursor-pointer border-2 border-gray-600 rounded-lg shadow-lg transition-all duration-300"
                    style={{ width: "100px", height: "100px", backgroundColor: "#3B82F6" }}
                    onClick={() => handleCardClick(index)}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {(state.flippedCards.includes(index) || state.matchedCards.includes(index)) && (
                        <motion.img
                            src={card.base64}
                            alt={card.name}
                            className="w-full h-full object-cover rounded-lg"
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ backgroundColor: "#3B82F6", overflow: "hidden" }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default GameBoard;
