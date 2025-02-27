import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GameContext from "../../contexts/GameContext.ts";
import { GameCardDto } from "../../dtos/GameCardDto.ts";
import styles from "./GameBoard.module.css";

const GameBoard = () => {
    const { gameCardsData, gameBoardData, gameStateData, flipCard } = useContext(GameContext);
    const [cards, setCards] = useState<GameCardDto[]>([]);
    const [gridSize, setGridSize] = useState(4);

    useEffect(() => {
        if (gameBoardData?.gameState) {
            const cardsLoaded = gameCardsData;
            const numCards = cardsLoaded.length;
            const calculatedGridSize = Math.ceil(Math.sqrt(numCards));

            setGridSize(calculatedGridSize);
            setCards(cardsLoaded);
        }
    }, [gameBoardData, gameCardsData]);

    const handleCardClick = (index: number) => {
        flipCard(index);
    };

    return (
        <div
            className={styles["game-board"]}
            style={{ gridTemplateColumns: `repeat(${gridSize}, auto)` }}
        >
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    className={`${styles["game-board__card"]} ${
                        gameStateData?.flippedCards.includes(index) ||
                        gameStateData?.matchedCards.includes(index)
                            ? styles["game-board__card--flipped"]
                            : ""
                    }`}
                    onClick={() => handleCardClick(index)}
                >
                    {gameStateData?.flippedCards.includes(index) || gameStateData?.matchedCards.includes(index) ? (
                        <img src={card.base64} alt={card.name} className={styles["game-board__image"]} />
                    ) : null}
                </motion.div>
            ))}
        </div>
    );
};

export default GameBoard;
