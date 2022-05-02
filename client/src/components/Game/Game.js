import React, {useEffect} from 'react';
import Table from "../Table";
import Dealer from "../Dealer";
import Loading from "../Loading/Loading";
import Modal from "../Modal";

const Game = ({loading, fetched, result, getGame}) => {
  useEffect(() => {
    getGame();
  }, [])

  if (!fetched) {
    return (
      <Loading />
    )
  }

  return (
    <React.Fragment>
      {loading
        ? <Loading />
        : null
      }
      <Table />
      <Dealer />
      {result && <Modal />}
    </React.Fragment>
  );
};

export default Game;