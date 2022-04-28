import React from 'react';

const Card = ({cardSuit, cardName}) => {
  return (
    <div className={`card ${cardSuit}`}>
      <div className="top">
        <span>{cardName}</span>
      </div>
      <div className="middle">
        <span>{cardSuit}</span>
      </div>
      <div className="bottom">
        <span>{cardName}</span>
      </div>
    </div>
  );
};

export default Card;