import axios from 'axios';

const TOKEN = 'token'
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
    const token = window.localStorage.getItem(TOKEN);
    try {
        const {data}= await axios.get(`/api/users/${userId}/order-history`, {
            headers: {
                authorization: token}})
        dispatch(gotHistoryFromServer(data));
    }  catch (error) {
        console.log(error);
    }
  };
};

//reducer
export default function orderHistoryReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDER_HISTORY:
      return action.orders;
    default:
      return state;
  }
}
