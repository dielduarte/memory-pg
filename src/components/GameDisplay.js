import React, { useCallback } from 'react';
import styled from 'styled-components';

const TextAction = styled.button`
  font-size: 18px;
  border: none;
  outline: none;
  cursor: pointer;
  line-height: 1.5em;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`;

function renderSettingUp() {
  return <TextAction>Connecting...</TextAction>;
}

function renderStartAction(handleStartRound, controllerType) {
  return (
    <TextAction onClick={handleStartRound}>
      {controllerType === 'joyCon'
        ? 'PRESS ANYTHING TO START'
        : 'CLICK HERE TO START'}
    </TextAction>
  );
}

function renderFailure(send) {
  return (
    <TextAction onClick={() => send('PLAY_WITH_MOUSE')}>
      OPS! NO JOY CON FOUND :( <br />
      CLICK HERE TO PLAY WITH MOUSE.
    </TextAction>
  );
}

function renderYourTimeText() {
  return <TextAction>YOUR TIME</TextAction>;
}

function renderFeedbackText(userWon, handleRestart, controllerType) {
  return (
    <TextAction onClick={handleRestart}>
      {`${userWon ? 'You got it!' : 'Not this time baby'}`}
      <br />
      {controllerType === 'joyCon' ? 'PRESS ANYTHING TO RESTART' : 'restart'}
    </TextAction>
  );
}

function renderIcon(iconClass) {
  return (
    <i className={`icon ${iconClass}`} style={{ transform: 'scale(2.5)' }} />
  );
}

function GameDisplay({ current, send }) {
  const { context, matches } = current;

  const handleStartRound = useCallback(() => {
    send('START_ROUND');
  }, [send]);

  const handleRestart = useCallback(() => {
    send('RESTART');
  }, [send]);

  switch (true) {
    case matches('settingUp'):
      return renderSettingUp();
    case matches('setupDone'):
      return renderStartAction(handleStartRound, context.controllerType);
    case matches('userChoicesIsOver'):
      return renderFeedbackText(
        context.userWon,
        handleRestart,
        context.controllerType
      );
    case matches('userTime'):
      return renderYourTimeText();
    case matches('failure'):
      return renderFailure(send);
    default:
      return renderIcon(
        context.currentSequence[context.currentSequence.length - 1]
      );
  }
}

export default GameDisplay;
