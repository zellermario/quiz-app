import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from "./reducer";

const initialState = {
  screen: "game",
  playerName: "",
  gameStarted: false,
  questions: [],
  remainingQuestions: [],
  score: 0,
  playedQuestion: null,
  selectedAnswer: null,
  showNext: false,
  showCorrect: false,
  showIncorrect: false,
  noMoreQuestions: false,
  editedQuestion: {}
};

const savedState = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : initialState;
const store = createStore(reducer, savedState);

store.subscribe(() => {
  localStorage.setItem('store', JSON.stringify(store.getState()));
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
