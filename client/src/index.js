import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './styles.scss';

import React from 'react';
import {createRoot} from "react-dom/client";
import App from "./components/App";
import {Provider} from "react-redux";
import {store} from "./store/store"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Game from "./components/Game";
import Login from "./components/Login";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="game" element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
)