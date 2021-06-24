import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, deleteFromCart } from "../store/order";

// items in cart (allow to edit, delete) (order reducer)
// show price and text (line item (from order, also be able to link to individual pun view)
// keep shopping button (return to all puns view)
// checkout button (go to checkout view)

export class OpenOrder extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    try {
      await this.props.loadCart();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>My Cart</h1>
          {this.props.order.puns.map((lineItem) => {
            return (
              <div key={lineItem.punId}>
                <li>
                  <Link to={`/puns/${lineItem.punId}`}>
                    <h4>Pun: {puns.content}</h4>
                  </Link>
                  <h5>${lineItem.price}</h5>
                  <form onSubmit={this.handleSubmit}>
                    <label>Quantity: </label>
                    <select onChange={this.handleChange}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                    <input type="submit" value="Change Quantity" />
                  </form>
                </li>
                <button
                  type="submit"
                  onClick={() =>
                    this.removeFromCart(lineItem.punId, lineItem.orderId)
                  }
                >
                  Remove Item From Cart
                </button>
              </div>
            );
          })}
          <h3>Total: ${this.props.order.total}</h3>
        </div>
        <div>
          <Link to={`/all-puns`}>Keep Shopping</Link>
          {/* need to create route/path to link to checkout component */}
          <Link to={`/checkout`}>Proceed to Checkout</Link>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.order,
  };
};

const mapDispatch = (dispatch) => ({
  loadCart: (userId, orderId) => dispatch(fetchCart(userId, orderId)),
  removeFromCart: (punId, orderId) => dispatch(deleteFromCart(punId, orderId)),
});

export default connect(mapState, mapDispatch)(OpenOrder);
