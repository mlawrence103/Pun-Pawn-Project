import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSinglePun } from "../store/singlePun";
import { fetchCart, addToCart, createCart } from "../store/order";

class SinglePun extends React.Component {
  constructor(props) {
    super(props);
    this.addItemToOrder = this.addItemToOrder.bind(this);
  }

  componentDidMount() {
    this.props.fetchSinglePun(this.props.match.params.id);
  }

  async addItemToOrder(pun) { //see the same method in all puns compoent for documentation 
  const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      const userOrder = await this.props.fetchCart(this.props.user, null);
    }
  else {
      const currentGuestOrderId = window.localStorage.getItem("currentOrderId");
      const guestOrder = await this.props.fetchCart(null, currentGuestOrderId);
      window.localStorage.setItem("currentOrderId", JSON.stringify(this.props.order.orderId));
    }
    const orderId = this.props.order.orderId;
    await this.props.addToCart(pun.id, orderId, 1, pun.price);
    console.log("this.props.order: ", this.props.order);
  }

  render() {
      const pun = this.props.pun
    return (
      <div className="single-pun" key={pun.id}>
                  <h2>Pun: {pun.content}</h2>
              <button
                type="submit"
                className="add-to-cart"
                onClick={() => this.addItemToOrder(pun)}
              >
                Add to Cart
              </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    pun: state.singlePun,
    isLoggedIn: !!state.auth.id,
    user: state.auth,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSinglePun: (pun) => dispatch(fetchSignlePun(pun)),
    addToCart: (punId, orderId, qty, price) =>
      dispatch(addToCart(punId, orderId, qty, price)),
    fetchCart: (userId, orderId) => dispatch(fetchCart(userId, orderId)),
    createCart: (userInfo) => dispatch(createCart(userInfo)),
  };
};

export default connect(mapState, mapDispatch)(SinglePun);