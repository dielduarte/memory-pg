import {Machine} from 'xstate';

import * as actions from './actions'
import * as guards from './guards'
import { getRandomIconByInterval } from './services'
import icons from './iconsMap'
import { assert } from 'chai';

export default Machine(
  {
    id: 'memoryPg',
    initial: 'idle',
    context: {
      points: 0,
      currentSequence: [],
      userSequence: [],
      userWon: undefined,
      interval: 1000,
      sequenceCount: 4,
      icons
    },
    states: {
      idle: {
        on: {
          START_ROUND: 'generatingRandomSequence'
        },
        meta: {
          test: ({ getByText }) => {
            assert.ok(getByText('START'))
          }
        }
      },
      generatingRandomSequence: {
        onEntry: ['addRandomIcon'],
        invoke: {
          src: getRandomIconByInterval,
          onDone: 'userTime'
        },
        on: {
          ADD_RANDOM_ICON: [
            {
              target: '',
              actions: 'addRandomIcon',
              cond: 'currentSequenceIsNotFullFiled'
            }
          ]
        }
      },
      userTime: {
        on: {
          ADD_USER_CHOICE: [
            {
              target: '',
              actions: ['addUserChoice'],
              cond: 'isUserChoicesOver'
            },
            {
              target: 'userChoicesIsOver',
              actions: ['addUserChoice']
            }
          ]
        }
      },
      userChoicesIsOver: {
        onEntry: ['checkIfUserWon', 'checkUserPoints'],
        on: {
          RESTART: {
            target: 'generatingRandomSequence',
            actions: ['resetState']
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
