import {getGame, hit, stand, restart} from "./actions";
import {handleActions} from "redux-actions"

const defaultState = {
  players: null,
  currentPlayer: null,
  result: null,
  loading: false,
  fetched: false,
}

export const reducer = handleActions({
    [getGame]: (state, {payload}) => {
      return {
        ...state,
        loading: true
      }
    },
    [getGame.success]: (state, {payload}) => {
      const {players, currentPlayer} = payload.data;
      return {
        ...state,
        players,
        currentPlayer,
        loading: false,
        fetched: true
      }
    },
    [hit]: (state, {payload}) => {
      return {
        ...state,
        loading: true
      }
    },
    [hit.success]: (state, {payload}) => {
      const {currentPlayer, result} = payload.data;
      return {
        ...state,
        loading: false,
        currentPlayer,
        result
      }
    },
    [stand]: (state, {payload}) => {
      return {
        ...state,
        loading: true
      }
    },
    [stand.success]: (state, {payload}) => {
      const {currentPlayer, result} = payload.data;
      return {
        ...state,
        loading: false,
        currentPlayer,
        result
      }
    },
    [restart]: (state, {payload}) => {
      return {
        ...state,
        loading: true
      }
    },
    [restart.success]: (state, {payload}) => {
      const {players, currentPlayer, result} = payload.data;
      return {
        ...state,
        players,
        currentPlayer,
        result,
        loading: false,
      }
    }
  }
, defaultState)