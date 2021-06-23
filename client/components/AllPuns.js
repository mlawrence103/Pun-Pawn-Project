import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPuns } from '../store/allPuns';
import DeletePunButton from './DeletePunButton';
import {
  fetchUserCart,
  fetchGuestCart,
  addToCart,
  createCart,
} from '../store/order';

class AllPuns extends React.Component {
  constructor(props) {
    super(props);
    this.addItemToOrder = this.addItemToOrder.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.props.fetchPuns();
  }

  async addItemToOrder(pun) {
    //intitial check in parent component that checks for order in local storage and adds it to state
    //check if there's an open order in state (not saved when leave site ==> user hasn't left site)
    //check if user is logged in, and try to get that user's open cart. if there's not an open cart associated with that user, then create a new cart in the fetchCart thunk
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      const userOrder = await this.props.fetchUserCart(this.props.user);
    }
    //if user is not logged in, check to see if there's an order in local storage or in state. if not, create a new order and store it in state
    else {
      const currentGuestOrderId = parseInt(
        window.localStorage.getItem('currentOrderId')
      );
      //if there's no currentGuestOrderId in local storage, it will be undefined which will cause fetchCart to create a new cart
      //possibly need to JSON.parse currentOrderId
      const guestOrder = await this.props.fetchGuestCart(currentGuestOrderId);
      window.localStorage.setItem(
        'currentOrderId',
        JSON.stringify(this.props.order.id)
      );
    }
    //then add item to order that is now in local storage
    const orderId = this.props.order.id;
    await this.props.addToCart(pun.id, orderId, 1, pun.price);
  }

  render() {
    return (
      <div>
        <h1>Puns:</h1>
        <ul className="listAllPuns">
          {this.props.allPuns.map((pun) => (
            <div className="single-pun-in-list" key={pun.id}>
              <Link to={`/puns/${pun.id}`}>
                <h2>{pun.content}</h2>
              </Link>
              <h5>${pun.price / 100}</h5>
              <button
                type="submit"
                className="quick-add-to-cart"
                onClick={() => this.addItemToOrder(pun)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    allPuns: state.allPuns,
    isLoggedIn: !!state.auth.id,
    user: state.auth,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPuns: () => dispatch(fetchPuns()),
    addToCart: (punId, orderId, qty, price) =>
      dispatch(addToCart(punId, orderId, qty, price)),
    fetchUserCart: (userId) => dispatch(fetchUserCart(userId)),
    fetchGuestCart: (orderId) => dispatch(fetchGuestCart(orderId)),
    createCart: (userInfo) => dispatch(createCart(userInfo)),
  };
};

export default connect(mapState, mapDispatch)(AllPuns);
