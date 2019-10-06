import React from 'react';
import { useMachine } from '@xstate/react';
import styled from "styled-components";

import gameMachine from './state/index'
import IconsGrid from "./components/IconsGrid";
import GameDisplay from "./components/GameDisplay";
import UserPoints from "./components/UserPoints";

const GameDisplayContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: center;
`


function App() {
  const [current, send] = useMachine(gameMachine, {  devTools: true })

  return (
    <>
      <UserPoints
        current={current}
        send={send}
      />
      <GameDisplayContainer>
        <GameDisplay
          current={current}
          send={send}
        />
      </GameDisplayContainer>
      <IconsGrid
        current={current}
        send={send}
      />
    </>
  );
}

export default App;
