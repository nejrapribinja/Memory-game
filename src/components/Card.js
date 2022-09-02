import React from "react";

const Card = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="card" key={card.id}>
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img
                    className="back"
                    src="/img/cover.jpg"
                    onClick={handleClick}
                    alt="card back" />
            </div>
        </div>
    )
}

export default Card;