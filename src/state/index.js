import React from 'react';
import { Machine, assign } from 'xstate';
import { isEqual } from 'lodash'
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';


export default Machine(
    {
        id: 'memoryPg',
        initial: 'idle',
        context: {
            points: 0,
            currentSequence: [],
            userSequence: [],
            userWon: undefined
        },
        states: {
            idle: {
                on: {
                    START_ROUND: { target: 'startRound', actions: 'addRandomIcon' }
                }
            },
            startRound: {
                invoke: {
                    src: (context, event) =>
                        interval(1000).pipe(
                            map(value => ('START')),
                            take(4)
                        ),
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
                    ADD_USER_CHOICE: { target: '', actions: ['addUserChoice', 'checkIfUserWon'] },
                    RESTART:  { target: 'startRound', actions: 'addRandomIcon' }
                }
            }
        }
    },
    {
        actions: {
            addRandomIcon: assign({
                currentSequence: context => [...context.currentSequence, 10]
            }),
            addUserChoice: assign({
                userSequence: (context, event) => {
                    return [...context.userSequence, event.payload.choice];
                }
            }),
            checkIfUserWon: assign((context, event) => {
                const userChoicesIsOver = context.userSequence.length >= 4
                const userWon = userChoicesIsOver && isEqual(context.userSequence, context.currentSequence)

                return {
                    userWon,
                    userSequence: userChoicesIsOver ? [] : context.userSequence,
                    currentSequence: userChoicesIsOver ? [] : context.currentSequence,
                    points: userChoicesIsOver ? context.points + 10 : context.points
                }
            })
        },
        guards: {
            isCurrentSequenceUnfinished: (context, event) => {
                return context.currentSequence.length < 4;
            }
        }
    }
);