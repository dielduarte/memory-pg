export const isCurrentSequenceUnfinished = (context) => {
  return context.currentSequence.length < context.sequenceCount;
}

export const isUserEnableToMakeChoice = (context) => {
  return !context.userChoicesIsOver
}
