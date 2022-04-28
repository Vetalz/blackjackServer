import React from 'react';
import Player from "../Player/Player";

const Table = ({players, currentPlayer}) => {
  return (
    <div className="table">
      <div className="players">
        {players.map((player) =>
          <Player
            name={player.name}
            score={player.score}
            cards={player.cards}
            isOver={player.isOver}
            isActive={player.id === currentPlayer.id}
            key={player.id}/>
        )}
      </div>
    </div>
  );
};

export default Table;