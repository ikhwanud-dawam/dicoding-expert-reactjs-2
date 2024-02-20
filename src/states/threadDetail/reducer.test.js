/**
* test scenario for threadDetailReducer
*
* - threadDetailReducer function
*  - should return the initial state when given by unknown action
*  - should return null when given by CLEAR_THREAD_DETAIL
*  - should return the threadDetail when given by RECEIVE_THREAD_DETAIL action
*  - should return the threadDetail with the toggled upvote thread when given by UPVOTE_THREAD_DETAIL action
*  - should return the threadDetail with the toggled downvote thread when given by DOWNVOTE_THREAD_DETAIL action
*  - should return the threadDetail with the clear upvote and downvote thread when given by NEUTRALIZE_THREAD_DETAIL_VOTE action
*  - should return the threadDetail with the added thread comment when given by ADD_THREAD_COMMENT action
*  - should return the threadDetail with the toggled upvote comment when given by UPVOTE_COMMENT action
*  - should return the threadDetail with the toggled downvote comment when given by DOWNVOTE_COMMENT action
*  - should return the threadDetail with the clear upvote and downvote comment when given by NEUTRALIZE_COMMENT action
*
*/

import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return the threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the threadDetail with the toggled upvote thread when given by UPVOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2', 'users-3'],
      downVotesBy: ['users-4', 'users-5'],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.UPVOTE_THREAD_DETAIL,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action upvote
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [...initialState.upVotesBy, action.payload.userId],
    });

    // action un-upvote
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with the toggled downvote thread when given by DOWNVOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2', 'users-3'],
      downVotesBy: ['users-4', 'users-5'],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.DOWNVOTE_THREAD_DETAIL,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action downvote
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [...initialState.downVotesBy, action.payload.userId],
    });

    // action un-downvote
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with the clear upvote and downvote thread when given by NEUTRALIZE_THREAD_DETAIL_VOTE action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2', 'users-3'],
      downVotesBy: ['users-4', 'users-5'],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: initialState.upVotesBy.filter((id) => id !== action.payload.userId),
      downVotesBy: initialState.downVotesBy.filter((id) => id !== action.payload.userId),
    });
  });

  it('should return the threadDetail with the added thread comment when given by ADD_THREAD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.ADD_THREAD_COMMENT,
      payload: {
        detailComment: {
          id: 'comment-2',
          content: 'Ini adalah komentar kedua',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        action.payload.detailComment,
        ...initialState.comments,
      ],
    });
  });

  it('should return the threadDetail with the toggled upvote comment when given by UPVOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-2', 'users-3'],
          downVotesBy: ['users-4', 'users-5'],
        },
      ],
    };
    const action = {
      type: ActionType.UPVOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    // action upvote
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [...initialState.comments[0].upVotesBy, action.payload.userId],
        },
      ],
    });

    // action un-upvote
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with the toggled downvote comment when given by DOWNVOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-2', 'users-3'],
          downVotesBy: ['users-4', 'users-5'],
        },
      ],
    };
    const action = {
      type: ActionType.DOWNVOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    // action downvote
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: [...initialState.comments[0].downVotesBy, action.payload.userId],
        },
      ],
    });

    // action un-downvote
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with the clear upvote and downvote comment when given by NEUTRALIZE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-1', 'users-2'],
          downVotesBy: ['users-3'],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRALIZE_COMMENT_VOTE,
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    // action neutralize
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: initialState.comments[0].upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: initialState.comments[0].downVotesBy.filter((id) => id !== action.payload.userId),
        },
      ],
    });
  });
});
