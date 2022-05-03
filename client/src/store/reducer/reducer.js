import {getGame, hit, stand, restart, login} from "./actions";
import {handleActions} from "redux-actions"

const defaultState = {
  token: localStorage.getItem('token'),
  players: null,
  currentPlayer: null,
  result: null,
  loading: false,
  fetched: false,
}

const handlerLoading = (state) => {
  return {
    ...state,
    loading: true
  }
}

const handlerGetGameSuccess = (state, {payload}) => {
  const {game} = payload.data;

  return {
    ...state,
    players: game.players,
    currentPlayer: game.currentPlayer,
    result: game.result,
    loading: false,
    fetched: true
  }
}

const handlerGetStepSuccess = (state, {payload}) => {
  const {game} = payload.data;
  return {
    ...state,
    loading: false,
    players: game.players,
    currentPlayer: game.currentPlayer,
    result: game.result,
  }
}

const handlerLoginSuccess = (state, {payload}) => {
  const {token, game} = payload.data;
  localStorage.setItem('token', token);
  return {
    ...state,
    loading: false,
    fetched: true,
    token,
    players: game.players,
    currentPlayer: game.currentPlayer,
    result: game.result
  }
}

const handlerFail = (state, {payload}) => {
  localStorage.clear();
  return {
    ...state,
    token: null,
    loading: false,
    fetched: true,
  }
}

export const reducer = handleActions({
    [login]: handlerLoading,
    [login.success]: handlerLoginSuccess,
    [getGame]: handlerLoading,
    [getGame.success]: handlerGetGameSuccess,
    [getGame.fail]: handlerFail,
    [hit]: handlerLoading,
    [hit.success]: handlerGetStepSuccess,
    [hit.fail]: handlerFail,
    [stand]: handlerLoading,
    [stand.success]: handlerGetStepSuccess,
    [stand.fail]: handlerFail,
    [restart]: handlerLoading,
    [restart.success]: handlerGetStepSuccess,
    [restart.fail]: handlerFail,
  }
, defaultState)