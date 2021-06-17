import axios from "axios";
import history from "../history";

// Fetch order including associated items
// Added item to cart (add item to global state of order)
// Delete item from cart action
// Edit quantity of items in cart action

//OPEN order = cart
//action types
const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const EDIT_QUANTITY = "EDIT_QUANTITY";

//action creators
const setCart = (order) => ({
  type: SET_CART,
  order,
});

const _addToCart = (order) => ({
  type: ADD_TO_CART,
  order,
});

const _deleteFromCart = (order) => ({
  type: DELETE_FROM_CART,
  order,
});

const _editQuantity = (order) => ({
  type: EDIT_QUANTITY,
  order,
});

//thunk creators
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      //may need to change get route from /orders to /users for myCart?
      const { data: cart } = await axios.get(`/api/orders/myCart/${userId}`);
      const action = setCart(cart);
      dispatch(action);
    } catch (error) {
      console.log("Cannot find cart", error);
    }
  };
};

export const addToCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.put("/api/orders/orderId/");
    } catch (error) {
      console.log("Failed to add to cart", error);
    }
  };
};

//reducer
export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.order;
    case ADD_TO_CART:
      return {};
    case DELETE_FROM_CART:
      return {};
    case EDIT_QUANTITY:
      return {};
  }
}
