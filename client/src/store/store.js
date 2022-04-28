import {createStore, applyMiddleware} from "redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import {reducer} from "./reducer/reducer";

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  responseType: 'json'
})


export const store = createStore(
  reducer,
  applyMiddleware(
    axiosMiddleware(client)
  )
  );