import axios from 'axios';
import history from '../history';

//action types
const GOT_PUNS_FROM_SERVER = 'GOT_PUNS_FROM_SERVER';
const CREATE_PUN = 'CREATE_PUN';
const DELETE_PUN = 'DELETE_PUN';

//action creators
export const gotPunsFromServer = (puns) => ({
  type: GOT_PUNS_FROM_SERVER,
  puns,
});

export const _createPun = (pun) => ({
  type: CREATE_PUN,
  pun,
});

export const _deletePun = (pun) => ({
  type: DELETE_PUN,
  pun,
});

//thunk creators
export const fetchPuns = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/puns');
      const puns = res.data;
      dispatch(gotPunsFromServer(puns));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPun = (pun, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/puns', pun);
      const newPun = res.data;
      dispatch(_createPun(newPun));
      history.push('/puns');
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePun = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/puns/${id}`);
      const pun = res.data;
      dispatch(_deletePun(pun));
    } catch (error) {
      next(error);
    }
  };
};

//puns reducer
export default function punsReducer(state = [], action) {
  switch (action.type) {
    case GOT_PUNS_FROM_SERVER:
      return action.puns;
    case CREATE_PUN:
      return [...state, action.pun];
    case DELETE_PUN:
      return state.filter((pun) => pun.id !== action.pun.id);
    default:
      return state;
  }
}
