import {createStore, applyMiddleware} from "redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import {reducer} from "./reducer/reducer";
import {token} from "./reducer/selectors";

const client = axios.create({
  baseURL: '/api',
  responseType: 'json'
})

const middlewareConfig = {
  interceptors: {
    request: [
      function ({getState}, req) {
        req.headers["Authorization"] = token(getState());
        return req
      }
    ]
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(
    axiosMiddleware(client, middlewareConfig)
  )
  );