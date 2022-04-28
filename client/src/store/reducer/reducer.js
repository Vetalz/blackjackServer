import {getGame, hit, stand, restart} from "./actions";
import {handleActions} from "redux-actions"

const defaultState = {
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
  const {players, currentPlayer} = payload.data;
  return {
    ...state,
    players,
    currentPlayer,
    loading: false,
    fetched: true
  }
}

const handlerGetStepSuccess = (state, {payload}) => {
  const {players, currentPlayer, result} = payload.data;
  return {
    ...state,
    loading: false,
    players,
    currentPlayer,
    result
  }
}

export const reducer = handleActions({
    [getGame]: handlerLoading,
    [getGame.success]: handlerGetGameSuccess,
    [hit]: handlerLoading,
    [hit.success]: handlerGetStepSuccess,
    [stand]: handlerLoading,
    [stand.success]: handlerGetStepSuccess,
    [restart]: handlerLoading,
    [restart.success]: handlerGetStepSuccess
  }
, defaultState)