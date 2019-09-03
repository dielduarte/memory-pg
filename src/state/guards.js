export const isCurrentSequenceUnfinished = (context) => {
  return context.currentSequence.length < context.sequenceCount;
}