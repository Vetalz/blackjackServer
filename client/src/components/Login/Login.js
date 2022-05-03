import React, {useCallback, useState} from 'react';
import {Navigate} from 'react-router-dom';

const Login = ({token, login}) => {
  const [players, setPlayers] = useState(['', '']);

  const addPlayer = useCallback(() => {
    setPlayers([...players, '']);
  }, [players])

  const removePlayer = useCallback((id) => {
    setPlayers(players.filter((name, index) => index !== id));
  }, [players])

  const changeName = useCallback((id, value) => {
    let newPlayers = [...players];
    newPlayers[id] = value;
    setPlayers(newPlayers);
  }, [players])

  const startGame = useCallback(() => {
    login(players);
  }, [players])

  if (token) {
    return <Navigate to="/game"/>
  }

  return (
    <div className="login">
      <div className="form">
        <h1>Enter player names</h1>
        {
          players.map((name, index) => (
            <div key={index}>
              <input type="text" value={name}
                     onChange={(e) => changeName(index, e.target.value)}
              />
              {players.length > 2 && <span className="stand close" onClick={() => removePlayer(index)}>X</span>}
            </div>
          ))
        }
        <button className="stand" onClick={addPlayer}>+</button>
        <button className="hit" onClick={startGame}>Start game</button>
      </div>
    </div>
  );
};

export default Login;