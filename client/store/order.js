import axios from 'axios';
import history from '../history';

//OPEN order = cart
//action types
const SET_CART = 'SET_CART';
const CREATE_CART = 'CREATE_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const EDIT_ITEM_QTY = 'EDIT_ITEM_QTY';
const CHECKOUT_CART = 'CHECKOUT_CART';
const SUBMIT_ORDER = 'SUBMIT_ORDER';

//action creators
const setCart = (order) => ({
  type: SET_CART,
  order,
});

//create new order route takes in: status, email, and shipping info, but only the status is required
const _createCart = (order) => ({
  type: CREATE_CART,
  order,
});

const _addToCart = (order) => ({
  type: ADD_TO_CART,
  newOrder,
});

const _deleteFromCart = (order) => ({
  type: DELETE_FROM_CART,
  order,
});

const _editItemQty = (order) => ({
  type: EDIT_ITEM_QTY,
  order,
});

const _checkoutCart = (order) => ({
  type: CHECKOUT_CART,
  order,
});

const _submitOrder = (order) => ({
  type: SUBMIT_ORDER,
  order,
});

//thunk creators

//if there is no passed in userId or orderId, then create a new cart
export const fetchCart = (user = null, orderId = null) => {
  return async (dispatch) => {
    try {
      let cart = {};
      if (user) {
        console.log('LOGGED IN user in fetch order reducer: ', user);
        const res = await axios.get(`/api/users/${user.id}/cart`);
        const cart = res.data;
        console.log('USER CART in fetch order reducer: ', cart);
        //if user is logged in, but doesn't have a cart (open order), then create a new cart with relevant userInfo
        if (!cart) {
          const {
            emailAddress,
            shippingAddressName,
            shippingAddressStreet,
            shippingAddressCity,
            shippingAddressState,
            shippingAddressZip,
            userId,
          } = user;
          createCart({
            emailAddress,
            shippingAddressName,
            shippingAddressStreet,
            shippingAddressCity,
            shippingAddressState,
            shippingAddressZip,
            userId,
          });
        }
      } else if (orderId) {
        console.log('ORDER ID in fetch order reducer: ', orderId);
        cart = await axios.get(`/api/orders/${orderId}`).data;
      } else {
        console.log(
          'NO userid or orderid in fetch order reducer -> create new cart '
        );
        //else if there is no userId or orderId
        cart = createCart();
      }
      const action = setCart(cart);
      dispatch(action);
    } catch (error) {
      console.log('Cannot find cart', error);
    }
  };
};

export const createCart = (userInfo) => {
  console.log('HERE in create cart thunk');
  return async (dispatch) => {
    try {
      const res = await axios.post('api/orders/', userInfo);
      const newOrder = res.data;
      dispatch(_createCart(newOrder));
    } catch (error) {
      console.log('Failed to create a new order', error);
    }
  };
};

export const addToCart = (punId, orderId, qty, price) => {
  return async (dispatch) => {
    try {
      //have something check to see if item is already in the order, and then in that case edit the line item quantity instead of adding a new line item
      //check global state or another axios request?
      //can we directly access state through the store?
      const lineItem = { punId, orderId, qty, price };
      const res = await axios.post('/api/orders/addToCart/', lineItem);
      const updatedLineItem = res.data;
      updatedLineItem['total'] = qty * price;
      dispatch(_addToCart(updatedLineItem));
    } catch (error) {
      console.log('Failed to add item to cart', error);
    }
  };
};

export const deleteFromCart = (punId, orderId) => {
  return async (dispatch) => {
    const requestBody = { punId, orderId };
    try {
      const { data: pun } = await axios.delete(
        '/api/orders/deleteItem',
        requestBody
      );
      dispatch(_deleteFromCart(pun));
    } catch (error) {
      console.log('Unable to remove item from cart', error);
    }
  };
};

export const editItemQty = (punId, orderId, qty, price) => {
  return async (dispatch) => {
    try {
      const lineItem = { punId: punId, orderId: orderId, quantity: qty };
      const res = await axios.put('/api/orders/editLineItem', lineItem);
      const updatedLineItem = res.data;
      updatedLineItem['total'] = qty * price;
      dispatch(_editItemQty(updatedLineItem));
    } catch (error) {
      console.log('Failed to edit cart', error);
    }
  };
};

//update all shipping info in this route EXCEPT status
export const checkoutCart = (order) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/${order.id}/checkout`, order);
      dispatch(_checkoutCart(data));
    } catch (error) {
      console.log('Unable to update checkout information', error);
    }
  };
};

//final submission of cart; update only status
export const submitOrder = (order) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/${order.id}/submit`, order);
      dispatch(_submitOrder(data));
    } catch (error) {
      console.log('Unable to process checkout', error);
    }
  };
};

//initial state
const initialState = { userId: null, total: 0, items: [] };

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.order;
    case CREATE_CART:
      return action.order;
    case ADD_TO_CART:
      return action.order;
    case DELETE_FROM_CART:
      return action.order;
    case EDIT_ITEM_QTY:
      return action.order;
    case CHECKOUT_CART:
      return action.order;
    case SUBMIT_ORDER:
      return action.order;
    default:
      return state;
  }
}
