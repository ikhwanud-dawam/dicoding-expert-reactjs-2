import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveThreadActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateThreadAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threads = await api.seeAllThreads();
      const users = await api.getAllUsers();

      dispatch(receiveThreadActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export default asyncPopulateThreadAndUsers;
