import React from 'react';
import { interpret } from 'xstate';

import logo from './logo.svg';
import './App.css';
import gameMachine from './state/index'


const gameService = interpret(gameMachine)
  .onTransition(state => console.log(state))
  .start();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => gameService.send('START_ROUND')}
        >
          START
        </a>
        <a
          onClick={() =>
            gameService.send({
              type: 'ADD_USER_CHOICE',
              payload: { choice: 10 }
            })
          }
        >
          add user choice
        </a>
        <a
          onClick={() =>
            gameService.send('START_ROUND')
          }
        >
          restart game
        </a>
      </header>
    </div>
  );
}

export default App;
