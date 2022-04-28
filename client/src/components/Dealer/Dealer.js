import React from 'react';
import reverseCard from '../../img/card_reverse.png';
import logo from '../../img/logo.png'

const Dealer = ({hit, stand, loading}) => {
  return (
    <div className="dealer">
      <div className="control">
        <img src={reverseCard} alt="reverse-card" className="cardReverse"/>
        <button className="hit" onClick={hit} disabled={loading}>Hit</button>
        <button className="stand" onClick={stand} disabled={loading}>Stand</button>
        <img src={logo} alt="logo" className="logo"/>
      </div>
    </div>
  );
};

export default Dealer;