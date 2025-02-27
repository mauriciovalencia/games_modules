import React, {useContext, useEffect, useState} from "react";
import {motion} from "framer-motion";
import GameContext from "../../contexts/GameContext.ts";
import {GameCardDto} from "../../dtos/GameCardDto.ts";


const GameBoard = () => {
    const {gameCardsData, gameBoardData, gameStateData, flipCard} = useContext(GameContext);
    const [cards, setCards] = useState([new GameCardDto()]);
    const [gridSize, setGridSize] = useState(0);
    const [numCards, setNumCards] = useState(0);

    const handleCardClick = (index: number) => {
        flipCard(index);
    };

    useEffect(() => {
        if (gameBoardData?.gameState) {
            // init calcs
            const cardsLoaded = gameCardsData;

            const numCardsCalc = cardsLoaded.length;
            const gridSizeCalc = numCards > 0 ? Math.ceil(Math.sqrt(numCardsCalc)) : 4;
            // sets
            setNumCards(numCardsCalc);
            setGridSize(gridSizeCalc);
            setCards(cardsLoaded);
        }
    }, [gameBoardData]);

    return (
        <React.Fragment>
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
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center justify-center cursor-pointer border-2 border-gray-600 rounded-lg shadow-lg transition-all duration-300"
                        style={{
                            width: "100px",
                            height: "100px",
                            backgroundColor: "#3B82F6",
                            overflow: "hidden",
                        }}
                        onClick={() => handleCardClick(index)}
                        whileTap={{scale: 0.95}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                    >
                        {gameStateData?.flippedCards.includes(index) || gameStateData?.matchedCards.includes(index) ? (
                            <motion.img
                                src={card.base64}
                                alt={card.name}
                                className="w-full h-full object-cover rounded-lg"
                                initial={{opacity: 0, rotateY: 90}}
                                animate={{opacity: 1, rotateY: 0}}
                                transition={{duration: 0.5}}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        ) : null}
                    </motion.div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default GameBoard;
