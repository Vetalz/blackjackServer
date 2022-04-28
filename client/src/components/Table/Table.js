import React, {useCallback} from 'react';
import Player from "../Player/Player";

const Table = ({players, currentPlayer}) => {
  const isActive = useCallback((id) => {
    return id === currentPlayer.id;
  }, [currentPlayer])

  return (
    <div className="table">
      <div className="players">
        {players.map((player) =>
          <Player
            name={player.name}
            score={player.score}
            cards={player.cards}
            isOver={player.isOver}
            isActive={isActive(player.id)}
            key={player.id}/>
        )}
      </div>
    </div>
  );
};

export default Table;