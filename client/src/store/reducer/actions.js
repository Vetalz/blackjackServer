import {createAction} from "redux-actions";

const createRequestAction = (type, payloadCreator) => {
  const action = createAction(type, payloadCreator);
  action.success = type + '_SUCCESS';
  action.fail = type + '_FAIL';

  return action;
}

export const login = createRequestAction('LOGIN', (names) => ({
  request: {
    method: 'post',
    url: '/login',
    data: {
      'players': names
    }
  }
}))

export const getGame = createRequestAction('GET_GAME', (token) => ({
  request: {
    method: 'get',
    url: '/game',
  }
}));

export const hit = createRequestAction('HIT', (token) => ({
  request: {
    method: 'post',
    url: '/hit',
  }
}));

export const stand = createRequestAction('STAND', (token) => ({
  request: {
    method: 'post',
    url: '/stand',
  }
}));

export const restart = createRequestAction('RESTART', (token) => ({
  request: {
    method: 'post',
    url: '/restart',
  }
}));