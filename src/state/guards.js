export const isUserChoicesOver = (context) => {
  return context.userSequence.length + 1 < context.sequenceCount
}

export const currentSequenceIsNotFullFiled = (context) => {
  return context.currentSequence.length + 1 <= context.sequenceCount
}
