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

export const updatePun = (pun) => ({
  type: UPDATE_PUN,
  pun,
});

//thunk creators
export const fetchSingleCampus = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`api/puns/${id}`);
      const pun = res.data;
      dispatch(gotSinglePun(pun));
    } catch (error) {
      console.log(error);
    }
  };
};
