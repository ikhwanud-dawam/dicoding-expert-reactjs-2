/**
* test scenario for threadsReducer
*
* - threadsReducer function
*  - should return the initial state when given by unknown action
*  - should return the threads when given by RECEIVE_THREADS action
*  - should return the threads with the new thread when given by ADD_THREADS action
*  - should return the threads with the toggled upvote thread when given by UPVOTE_THREAD action
*  - should return the threads with the toggled downvote thread when given by DOWNVOTE_THREAD action
*  - should return the threads with the clear upvote and downvote thread when given by NEUTRALIZE_THREAD_VOTE action
*
*/

import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrage
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREADS action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the toggled upvote thread when given by UPVOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-2', 'users-3'],
        downVotesBy: ['users-4', 'users-5'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action upvote
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [...initialState[0].upVotesBy, action.payload.userId],
      },
    ]);

    // action un-upvote
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the threads with the toggled downvote thread when given by DOWNVOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-2', 'users-3'],
        downVotesBy: ['users-4', 'users-5'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action downvote
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [...initialState[0].downVotesBy, action.payload.userId],
      },
    ]);

    // action un-downvote
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the threads with the clear upvote and downvote thread when given by NEUTRALIZE_THREAD_VOTE action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1', 'users-2'],
        downVotesBy: ['users-1', 'users-3'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.NEUTRALIZE_THREAD_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: initialState[0].upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: initialState[0].downVotesBy.filter((id) => id !== action.payload.userId),
      },
    ]);
  });
});
