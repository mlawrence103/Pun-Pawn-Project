import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPuns } from '../store/allPuns';
import { fetchCart, addToCart, createCart } from '../store/order';

class AllPuns extends React.Component {
  constructor(props) {
    super(props);
    this.addItemToOrder = this.addItemToOrder.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.props.fetchPuns();
  }

  async addItemToOrder(punId) {
    //intitial check in parent component that checks for order in local storage and adds it to state
    //check if there's an open order in state (not saved when leave site ==> user hasn't left site)

    //if there's an open order, fetch either by userId or orderId

    //check if user is logged in, and try to get that user's open cart. if there's not an open cart associated with that user, then create a new cart in the fetchCart thunk
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      await this.props.fetchCart(this.props.user, null);
    }
    //if user is not logged in, check to see if there's an order in local storage or in state. if not, create a new order and store it in state
    else {
      const currentOrderId = window.localStorage.getItem('currentOrderId');
      if (currentOrderId) {
        //possibly need to JSON.parse currentOrderId
        this.props.fetchCart(null, currentOrderId);
      }
    }

    //if isLogged in is true, then there is a user logged in and a new cart should be created with that info
    //else if check if there's an open order id in local storage
    //if there's not an open order in state or local storage create new order
    //then add item to order that is now in local storage
  }

  render() {
    return (
      <div>
        <h1>Puns:</h1>
        <ul className="listAll">
          {this.props.allPuns.map((pun) => (
            <div className="single-pun-in-list" key={pun.id}>
              <Link to={`/puns/${pun.id}`}>
                <li>
                  <h2>Pun: {pun.content}</h2>
                </li>
              </Link>
              <button
                type="submit"
                className="quick-add-to-cart"
                onClick={() => this.addItemToOrder(pun.id)}
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
    addToCart: ({ punId, orderId, qty, price }) =>
      dispatch(addToCart({ punId, orderId, qty, price })),
    fetchCart: (userId, orderId) => dispatch(fetchCart(userId, orderId)),
    createCart: (userInfo) => dispatch(createCart(userInfo)),
  };
};

export default connect(mapState, mapDispatch)(AllPuns);
