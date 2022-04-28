import React, {useCallback} from 'react';

const Card = ({cardSuit, cardName, cardValue}) => {
  const renderSuit = useCallback((suit) => {
    let sign = '';
    switch (suit) {
      case 'diamond':
        sign = '♦'
        break
      case 'heart':
        sign = '♥'
        break
      case 'spade':
        sign = '♠'
        break
      case 'club':
        sign = '♣'
        break
    }
    return sign;
  }, [cardSuit])

  const getColor = useCallback((suit) => {
    if (suit === 'diamond' || suit === 'heart') {
      return 'red';
    }
    return 'black';
  }, [cardSuit])

  return (
    <div className={`card ${getColor(cardSuit)}`}>
      <div className="top">
        <span>{cardName}</span>
      </div>
      <div className="middle">
        <span>{renderSuit(cardSuit)}</span>
      </div>
      <div className="bottom">
        <span>{cardName}</span>
      </div>
    </div>
  );
};

export default Card;