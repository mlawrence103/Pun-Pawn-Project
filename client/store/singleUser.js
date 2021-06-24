import axios from 'axios';
import { addedUser } from './allUsers';

const TOKEN = 'token';

//ACTION TYPES

const SET_USER = 'SET_USER';

//ACTION CREATOR

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

//THUNK CREATORS

export const fetchUser = (id) => {
  console.log('in fetch user thunk with id: ', id);
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const signingUp = (newUser, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users', newUser);
      dispatch(setUser(data));
      history.push('/users/');
    } catch (error) {
      console.error(error);
    }
  };
};

export const updatingAccount = (id, user) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/users/${id}`, user);
    dispatch(setUser(data));
  };
};

// USER SUB_REDUCER
export default function singleUserReducer(user = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return user;
  }
}
