import {Machine} from 'xstate';

import * as actions from './actions'
import * as guards from './guards'
import { getRandomIconByInterval } from './services'

export default Machine(
  {
    id: 'memoryPg',
    initial: 'idle',
    context: {
      points: 0,
      currentSequence: [],
      userSequence: [],
      userWon: undefined,
      userChoicesIsOver: false,
      interval: 1000,
      sequenceCount: 4
    },
    states: {
      idle: {
        on: {
          START_ROUND: {
            target: 'startRound',
            actions: 'addRandomIcon'
          }
        }
      },
      startRound: {
        invoke: {
          src: getRandomIconByInterval,
        },
        on: {
          START: [
            {
              target: '',
              actions: 'addRandomIcon',
              cond: 'isCurrentSequenceUnfinished'
            },
            { target: 'stopRound' }
          ]
        }
      },
      stopRound: {
        on: {
          ADD_USER_CHOICE: {
            target: '',
            actions: ['addUserChoice', 'checkIfUserChoicesIsOver', 'checkIfUserWon', 'checkUserPoints']
          },
          RESTART: {
            target: 'startRound',
            actions: ['resetState', 'addRandomIcon']
          }
        }
      }
    }
  },
  {
    actions,
    guards
  }
);
