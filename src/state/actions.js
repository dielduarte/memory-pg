import {assign} from "xstate";
import {isEqual} from "lodash";

export const addRandomIcon = assign({
  currentSequence: context => [...context.currentSequence, 10]
})

export const addUserChoice = assign({
  userSequence: (context, event) => {
    return [...context.userSequence, event.payload.choice];
  }
})

export const checkIfUserChoicesIsOver = assign({
  userChoicesIsOver: (context) => context.userSequence.length >= context.sequenceCount
})

export const checkIfUserWon = assign((context) => {
  const userWon = context.userChoicesIsOver && isEqual(context.userSequence, context.currentSequence)

  return {
    userWon,
    points: context.userChoicesIsOver ? context.points + 10 : context.points
  }
})

export const resetState = assign({
  userWon: false,
  userSequence: [],
  currentSequence: [],
  userChoicesIsOver: false
})