import React from 'react';
import MemoryPg from './App';

import { render, fireEvent, cleanup } from '@testing-library/react';
import { createModel } from '@xstate/test';
import gameMachine from './state/index';
import iconsMap from './state/iconsMap';

describe('memory pg app', () => {
  const testModel = createModel(gameMachine, {
    events: {
      START_ROUND: ({ getByText }) => {
        fireEvent.click(getByText('START'));
      },
      ADD_USER_CHOICE: {
        exec: async ({ getByTestId }, event) => {
          fireEvent.click(getByTestId(event.payload.iconId));
        },
        cases: [
          { payload: { iconId: iconsMap[0] } },
          { payload: { iconId: iconsMap[2] } },
          { payload: { iconId: iconsMap[3] } },
          { payload: { iconId: iconsMap[4] } }
        ]
      }
    }
  });

  const testPlans = testModel.getSimplePathPlans();

  // testPlans
  //   .forEach(plan => {
  //     describe(plan.description, () => {
  //       afterEach(cleanup);
  //
  //       plan.paths.forEach(path => {
  //         it(path.description, () => {
  //           const rendered = render(<MemoryPg />);
  //           return path.test(rendered);
  //         });
  //       });
  //     });
  //   });

  // it('coverage', () => {
  //   testModel.testCoverage();
  // });
});
