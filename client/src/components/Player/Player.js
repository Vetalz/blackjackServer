import React from 'react';
import Card from "../Card/Card";

const Player = ({name, score, cards, isOver, isActive}) => {
  return (
    <div className={`player ${isActive ? 'active' : null}`}>
      <div className="profile">
        <h2 className="name">{name}</h2>
      </div>
      <div className={`score ${isOver ? 'red' : null}`}>
        <span>{score}</span>
      </div>
      <div className="cards">
        {cards.map((card, i) =>
          <Card cardSuit={card.cardSuit} cardName={card.cardName} cardValue={card.cardValue} key={i}/>
        )}
      </div>
    </div>
  );
};

export default Player;