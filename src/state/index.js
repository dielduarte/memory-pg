import { Machine } from 'xstate';

import * as actions from './actions';
import * as guards from './guards';
import { getRandomIconByInterval } from './services';
import icons from './iconsMap';

export default Machine(
  {
    id: 'memoryPg',
    initial: 'settingUp',
    context: {
      points: 0,
      currentSequence: [],
      userSequence: [],
      userWon: undefined,
      interval: 1000,
      sequenceCount: 4,
      icons,
      activeIconIndex: -1,
      controllerType: 'joyCon' // joyCon or mouse
    },
    states: {
      settingUp: {
        on: {
          JOY_CON_CONNECTED: {
            target: 'setupDone',
            actions: ['setJoyConAsController']
          },
          JOY_CON_NOT_FOUND: 'failure'
        }
      },
      setupDone: {
        on: {
          START_ROUND: 'generatingRandomSequence',
          KEY_CHANGE: {
            target: 'generatingRandomSequence',
            cond: 'isPlayingWithJoyCon'
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
          KEY_CHANGE: {
            target: '',
            actions: ['setActiveIconIndex'],
            cond: 'isPlayingWithJoyCon'
          },
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
          KEY_CHANGE: {
            target: 'generatingRandomSequence',
            cond: 'isPlayingWithJoyCon',
            actions: ['resetState']
          },
          RESTART: {
            target: 'generatingRandomSequence',
            actions: ['resetState']
          }
        }
      },
      failure: {
        on: {
          PLAY_WITH_MOUSE: {
            target: 'setupDone',
            actions: ['setMouseAsController']
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
