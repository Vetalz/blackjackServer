import React from 'react';
import Player from "../Player/Player";

const Table = () => {
  return (
    <div className="table">
      <div className="players">
        <Player />
        <Player />
      </div>
    </div>
  );
};

export default Table;