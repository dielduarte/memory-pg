import { assign } from "xstate";
import { isEqual } from "lodash";

import { getRandomIcon } from './services'

export const addRandomIcon = assign({
  currentSequence: context => [...context.currentSequence, getRandomIcon(context)]
})

export const addUserChoice = assign({
  userSequence: (context, event) => {
    return [...context.userSequence, event.payload.iconId];
  }
})

export const checkIfUserWon = assign({
  userWon: (context) => isEqual(context.userSequence, context.currentSequence)
})

export const checkUserPoints = assign({
  points: (context) => context.userWon ? context.points + 10 : context.points
})

export const resetState = assign({
  userWon: false,
  userSequence: [],
  currentSequence: [],
  userChoicesIsOver: false
})
