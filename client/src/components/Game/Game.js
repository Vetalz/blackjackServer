import React, {useEffect} from 'react';
import Table from "../Table";
import Dealer from "../Dealer";
import Loading from "../Loading/Loading";
import Modal from "../Modal";
import {Navigate} from "react-router-dom";

const Game = ({loading, fetched, result, token, getGame}) => {
  useEffect(() => {
    if (!fetched) {
      getGame();
    }
  }, [])

  if (!fetched) {
    return (
      <Loading />
    )
  }
  if (!token) {
    return <Navigate to='/login'/>;
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