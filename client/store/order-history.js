import axios from 'axios';

//action types
const SET_ORDER_HISTORY = 'SET_ORDER_HISTORY';

//action creator
export const gotHistoryFromServer = (orders) => ({
  type: SET_ORDER_HISTORY,
  orders,
});


//thunk creator
export const fetchOrderHistory = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      dispatch(gotHistoryFromServer(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer
export default function orderHistoryReducer(state = [], action) {
  switch (action.type) {
    case GOT_PUNS_FROM_SERVER:
      return action.orders;
    default:
      return state;
  }
}
