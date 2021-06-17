import axios from "axios";
import { ids } from "webpack";
import history from "../history";

// Fetch order including associated items
// Added item to cart (add item to global state of order) EDIT may be part of the same ADD action
// Delete item from cart action

//OPEN order = cart
//action types
const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const EDIT_ITEM_QTY = "EDIT_ITEM_QTY";

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

const _editItemQty = (order) => ({
  type: EDIT_ITEM_QTY,
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

export const deleteFromCart = (punId) => {
  return async (dispatch) => {
    try {
      const { data: pun } = await axios.delete();
      //need to add delete route --> do we need to create a lineItems router?
      dispatch(_deleteFromCart(pun));
    } catch (error) {
      console.log("Unable to remove item from cart", error);
    }
  };
};

export const editItemQty = ({ punId, orderId, qty, price }) => {
  return async (dispatch) => {
    try {
      const lineItem = { punId, orderId, qty, price };
      const res = await axios.put("/api/orders/orderId/", lineItem);
      const updatedLineItem = res.data;
      updatedLineItem["total"] = qty * price;
      dispatch(_editItemQty(updatedLineItem));
    } catch (error) {
      console.log("Failed to edit cart", error);
    }
  };
};

//initial state
const initialState = { userId: null, total: 0, items: [] };

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.order;
    case ADD_TO_CART:
      return {};
    case DELETE_FROM_CART:
      return action.order;
    case EDIT_ITEM_QTY:
      return action.order;
    default:
      return state;
  }
}
