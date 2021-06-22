import React from "react";
import { connect } from "react-redux";
import { fetchSinglePun } from "../store/singlePun";
import { fetchCart, addToCart, createCart } from "../store/order";

class SinglePun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.addItemToOrder = this.addItemToOrder.bind(this);
  }

  componentDidMount() {
    this.props.fetchSinglePun(this.props.match.params.id);
  }
  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
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
        <form  className="update-form" onSubmit={this.addItemToOrder(pun)}>
          <select name="quantity" onChange={this.handleChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
          </select >
          <button type="submit" className="add-to-cart" >
            Add to Cart
          </button>
        </form>
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
    fetchSinglePun: (pun) => dispatch(fetchSinglePun(pun)),
    addToCart: (punId, orderId, qty, price) =>
      dispatch(addToCart(punId, orderId, qty, price)),
    fetchCart: (userId, orderId) => dispatch(fetchCart(userId, orderId)),
    createCart: (userInfo) => dispatch(createCart(userInfo)),
  };
};

export default connect(mapState, mapDispatch)(SinglePun);