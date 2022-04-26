import React from 'react';
import reverseCard from '../../img/card_reverse.png';
import logo from '../../img/logo.png'

const Dealer = () => {
  return (
    <div className="dealer">
      <div className="control">
        <img src={reverseCard} alt="reverse-card" className="cardReverse"/>
        <button className="hit">Hit</button>
        <button className="stand">Stand</button>
        <img src={logo} alt="logo" className="logo"/>
      </div>
    </div>
  );
};

export default Dealer;