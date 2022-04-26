import React from 'react';

const Modal = () => {
  return (
    <div className="modal-back">
      <div className="modal">
        <h2>Result</h2>
        <h1>
          <span className="black">♠</span>
          <span className="red">♥</span>
          <span>Draw</span>
          <span className="red">♦</span>
          <span className="black">♣</span>
        </h1>
        <button className="hit">Play again</button>
      </div>
    </div>
  );
};

export default Modal;