import axios from 'axios';
import history from '../history';

//action types
const GOT_SINGLE_PUN_FROM_SERVER = 'GOT_SINGLE_PUN_FROM_SERVER';
const UPDATE_PUN = 'UPDATE_PUN';

//action creators
export const gotSinglePun = (pun) => ({
  type: GOT_SINGLE_PUN_FROM_SERVER,
  pun,
});

export const _updatePun = (pun) => ({
  type: UPDATE_PUN,
  pun,
});

//thunk creators
export const fetchSinglePun = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/puns/${id}`);
      const pun = res.data;
      dispatch(gotSinglePun(pun));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePun = (pun, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/puns/${pun.id}`, pun);
      const updatedPun = res.data;
      dispatch(_updatePun(updatedPun));
      history.push(`/puns/${pun.id}`);
    } catch (error) {
      console.log(error);
    }
  };
};

//single pun reducer
export default function singlePunReducer(state = {}, action) {
  switch (action.type) {
    case GOT_SINGLE_PUN_FROM_SERVER:
      return action.pun;
    case UPDATE_PUN:
      return action.pun;
    default:
      return state;
  }
}
