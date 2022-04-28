import React from 'react';

const Modal = ({result, restart, loading}) => {
  return (
    <div className="modal-back">
      <div className="modal">
        <h2>Result</h2>
        <h1>
          <span className="♠">♠</span>
          <span className="♥">♥</span>
          <span>{result}</span>
          <span className="♦">♦</span>
          <span className="♣">♣</span>
        </h1>
        <button className="hit" onClick={restart} disabled={loading}>Play again</button>
      </div>
    </div>
  );
};

export default Modal;