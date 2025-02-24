import {CardModel} from "../../models/CardModel.ts";
import {GameBoardModel} from "../../models/GameBoardModel.ts";


const GameBoard = (data: GameBoardModel) => {
    const {gameState, handleCardClick} = data;
    return (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {gameState.cards.map((card: CardModel, index: number) => (
                <div
                    key={index}
                    className={`w-24 h-32 flex items-center justify-center cursor-pointer border-2 border-gray-300 rounded-lg shadow-lg transition-all duration-300 ${
                        gameState.flippedCards.includes(index) || gameState.matchedCards.includes(index) ? "bg-white" : "bg-gray-400"
                    }`}
                    onClick={() => handleCardClick(index)}
                >
                    {gameState.flippedCards.includes(index) || gameState.matchedCards.includes(index) ? (
                        <img src={card.base64} alt="Animal" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <span className="text-3xl text-white font-bold">?</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
