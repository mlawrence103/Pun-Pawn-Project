import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPuns } from '../store/allPuns';
import { addToCart } from '../store/order';

class AllPuns extends React.Component {
  constructor(props) {
    super(props);
    this.addItemToOrder = this.addItemToOrder.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.props.fetchPuns();
  }

  addItemToOrder(punId) {
    //check if there's an open order in state (not saved when leave site ==> user hasn't left site)
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPuns: () => dispatch(fetchPuns()),
    addToCart: ({ punId, orderId, qty, price }) =>
      dispatch(addToCart({ punId, orderId, qty, price })),
  };
};

export default connect(mapState, mapDispatch)(AllPuns);
