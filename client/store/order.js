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
const setCart = (order) => {
  console.log('order in setCart action: ', order);
  return {
    type: SET_CART,
    order,
  };
};

//create new order route takes in: status, email, and shipping info, but only the status is required
const _createCart = (order) => ({
  type: CREATE_CART,
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
        cart = res.data;
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
          cart = await createCart({
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
        console.log('type of order id: ', typeof orderId);
        console.log('ORDER ID in fetch order reducer: ', orderId);
        const { data } = await axios.get(`/api/orders/${orderId}`);
        console.log('data returned from get by orderId req: ', data);
        cart = data;
        console.log('GUEST CART with open order: ', cart);
      } else {
        console.log(
          'NO userid or orderid in fetch order reducer -> create new cart '
        );
        //else if there is no userId or orderId
        const create = createCart();
        cart = await create(dispatch);
        console.log(cart, 'guest cart in fetch order thunk');
      }
      const action = setCart(cart);
      dispatch(action);
    } catch (error) {
      console.log('Cannot find cart', error);
    }
  };
};

export const createCart = (
  userInfo = {
    emailAddress: null,
    shippingAddressName: null,
    shippingAddressStreet: null,
    shippingAddressCity: null,
    shippingAddressState: null,
    shippingAddressZip: null,
  }
) => {
  console.log('userInfo in create thunk: ', userInfo);
  return async (dispatch) => {
    try {
      console.log('HERE in create cart thunk');
      const res = await axios.post('/api/orders/', userInfo);
      const order = res.data;
      dispatch(_createCart(order));
      return order;
    } catch (error) {
      console.log('Failed to create a new order', error);
    }
  };
};

export const addToCart = (punId, orderId, qty, price) => {
  console.log('HERE in add to cart thunk');
  console.log('arguments: ', punId, orderId, qty, price);
  return async (dispatch) => {
    try {
      //have something check to see if item is already in the order, and then in that case edit the line item quantity instead of adding a new line item
      //check global state or another axios request?
      //can we directly access state through the store?
      const lineItem = { punId, orderId, qty, price };
      console.log(lineItem, 'line item in add to cart');
      const res = await axios.post('/api/orders/addToCart', lineItem);
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
const initialState = { userId: null, total: 0, items: [], orderId: null };

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.order;
    case CREATE_CART:
      console.log('in create cart reducer');
      return action.order;
    case ADD_TO_CART:
      console.log('in add to cart reducer');
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
