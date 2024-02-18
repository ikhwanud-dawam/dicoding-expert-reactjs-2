/**
* test scenario for usersReducer
*
* - usersReducer function
*  - should return the initial state when given by unknown action
*  - should return the users when given by RECEIVE_USERS action
*
*/

import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import usersReducer from './reducer';

describe('usersReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrage
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given by RECEIVE_USERS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.users);
  });
});
