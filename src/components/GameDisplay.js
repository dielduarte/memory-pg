import React, { useCallback }  from 'react'
import styled from "styled-components";

const TextAction = styled.button`
  font-size: 18px;
  border: none;
  outline: none;
  cursor: pointer;
  line-height: 1.5em;
  text-transform: uppercase;
  
  @media(min-width: 768px) {
    font-size: 22px;
  }
`

function renderStartAction(handleStartRound) {
  return <TextAction onClick={handleStartRound}>
    START
  </TextAction>
}

function renderYourTimeText() {
  return <TextAction>
    YOUR TIME
  </TextAction>
}

function renderFeedbackText(userWon, handleRestart) {
  return <TextAction onClick={handleRestart}>
    {`${userWon ? 'You got it!': 'Not this time baby'}`}
    <br />
    restart
  </TextAction>
}

function renderIcon(iconClass) {
  return <i className={`icon ${iconClass}`}/>
}

function GameDisplay({ current, send }) {
  const { context, matches } = current

  const handleStartRound = useCallback(() => {
    send('START_ROUND')
  }, [send])

  const handleRestart = useCallback(() => {
    send('RESTART')
  }, [send])


  switch (true) {
    case matches('idle'):
      return renderStartAction(handleStartRound)
    case context.userChoicesIsOver:
      return renderFeedbackText(context.userWon, handleRestart)
    case matches('stopRound'):
      return renderYourTimeText()
    default:
      return renderIcon(context.currentSequence[context.currentSequence.length - 1])
  }
}

export default GameDisplay