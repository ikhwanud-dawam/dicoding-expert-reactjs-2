/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should store accessToken in local storage when user login
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncUnsetAuthUser thunk
 *  - accessToken in local storage should be null when user logout
 *  - should dispatch action correctly when user logout
 */

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator,
} from './action';

const fakeAccessTokenResponse = 'fakeAccessToken';

const fakeAuthUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    delete api._login;
    delete api._getOwnProfile;
  });

  it('should store accessToken in local storage when user login', async () => {
    // Arrange
    const email = 'john@example.com';
    const password = 'password';
    // stub implementation
    api.login = () => Promise.resolve(fakeAccessTokenResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncSetAuthUser({ email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(localStorage.getItem('accessToken')).toBe(fakeAccessTokenResponse);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const email = 'john@example.com';
    const password = 'password';
    // stub implementation
    api.login = () => Promise.resolve(fakeAccessTokenResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email, password })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    const email = 'john@example.com';
    const password = 'password';
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser({ email, password })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('accessToken in local storage should be null when user logout', () => {
    // arrange
    // mock dispatch
    const dispatch = vi.fn();

    // action
    asyncUnsetAuthUser()(dispatch);

    // assert
    expect(localStorage.getItem('accessToken')).toBe('');
  });

  it('should dispatch action correctly when user logout', () => {
    // arrange
    // mock dispatch
    const dispatch = vi.fn();

    // action
    asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
