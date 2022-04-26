import React from 'react';
import Card from "../Card/Card";

const Player = () => {
  return (
    <div className="player active">
      <div className="profile">
        <h2 className="name">Name</h2>
      </div>
      <div className="score">
        {/*может быть добавлен класс red*/}
        <span>20</span>
      </div>
      <div className="cards">
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Player;