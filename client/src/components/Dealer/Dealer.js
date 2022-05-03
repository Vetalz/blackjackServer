import React from 'react';
import reverseCard from '../../img/card_reverse.png';
import logo from '../../img/logo.png'
import {Navigate} from "react-router-dom";

const Dealer = ({hit, stand, loading, token}) => {

  return (
    <div className="dealer">
      <div className="control">
        <img src={reverseCard} alt="reverse-card" className="cardReverse"/>
        <button className="hit" onClick={() => hit(token)} disabled={loading}>Hit</button>
        <button className="stand" onClick={() => stand(token)} disabled={loading}>Stand</button>
        <img src={logo} alt="logo" className="logo"/>
      </div>
    </div>
  );
};

export default Dealer;