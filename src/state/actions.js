import { assign } from 'xstate';
import { isEqual, get } from 'lodash';

import { getRandomIcon } from './services';
import icons from './iconsMap';

export const addRandomIcon = assign({
  currentSequence: context => [
    ...context.currentSequence,
    getRandomIcon(context)
  ]
});

export const addUserChoice = assign({
  userSequence: (context, event) => {
    const getFromActiveIconIndex = get(
      event.payload,
      'getFromActiveIconIndex',
      false
    );

    if (getFromActiveIconIndex) {
      return [...context.userSequence, icons[context.activeIconIndex]];
    }

    return [...context.userSequence, event.payload.iconId];
  }
});

export const checkIfUserWon = assign({
  userWon: context => isEqual(context.userSequence, context.currentSequence)
});

export const checkUserPoints = assign({
  points: context => (context.userWon ? context.points + 10 : context.points)
});

export const resetState = assign({
  userWon: false,
  userSequence: [],
  currentSequence: [],
  userChoicesIsOver: false,
  activeIconIndex: -1
});

export const setJoyConAsController = assign({
  controllerType: 'joyCon'
});

export const setMouseAsController = assign({
  controllerType: 'mouse'
});

const ENABLED_KEYS = ['dpadLeft', 'dpadRight', 'dpadUp', 'dpadDown'];

export const setActiveIconIndex = assign({
  activeIconIndex: (context, event) => {
    const { activeIconIndex } = context;
    const { position } = event.payload;

    if (!ENABLED_KEYS.includes(position)) return activeIconIndex;

    if (position === 'dpadDown' && activeIconIndex < 11) {
      return activeIconIndex + 1; // right
    }

    if (position === 'dpadUp' && activeIconIndex > 0) {
      return activeIconIndex - 1; // left
    }

    if (position === 'dpadLeft' && activeIconIndex <= 5) {
      return activeIconIndex + 6; // down
    }

    if (position === 'dpadRight' && activeIconIndex > 5) {
      return activeIconIndex - 6; // up
    }

    return activeIconIndex;
  }
});
