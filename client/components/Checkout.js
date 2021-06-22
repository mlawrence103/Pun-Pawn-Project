import React from "react";
import { connect } from "react-redux";
import { fetchCart, checkoutCart } from "../store/order";
import { fetchUser, updatingAccount } from "../store/singleUser";

// -local state includes payment info
// -shows items cart w/price and text (order reducer)
// -shipping info form (pre-populated for user, not for guest) (check user reducer)
// -billing info form (pre-populated for user, not for guest) (check user reducer)
export class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      shippingAddressName: "",
      shippingAddressStreet: "",
      shippingAddressCity: "",
      shippingAddressState: "",
      shippingAddressZip: "",
      billingAddressName: "",
      billingAddressStreet: "",
      billingAddressCity: "",
      billingAddressState: "",
      billingAddressZip: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      console.log("component did mount");
      await this.props.loadCart();
      await this.props.loadUserInfo();
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateOrderInfo(this.props.order);
    //billing info is only associated with user; should we include it in an order?
    // otherwise we are just going to update it from user info
    // this.props.userInfo(this.props.singleUser.this.props.singleUser)
    this.setState({
      shippingAddressName: "",
      shippingAddressStreet: "",
      shippingAddressCity: "",
      shippingAddressState: "",
      shippingAddressZip: "",
      billingAddressName: "",
      billingAddressStreet: "",
      billingAddressCity: "",
      billingAddressState: "",
      billingAddressZip: "",
    });
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <div>
          <h1>Cart</h1>
          {this.props.order.puns.map((lineItem) => {
            return (
              <div key={lineItem.punId}>
                <li>
                  <h4>{puns.content}</h4>
                  <h5>${lineItem.price}</h5>
                  <h5>Quantity: {lineItem.quantity}</h5>
                </li>
              </div>
            );
          })}
          <h3>Total: ${this.props.order.total}</h3>
        </div>
        <div>
          <h1>Shipping Info</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="shippingAddressName">Name: </label>
            <input
              name="shippingAddressName"
              onChange={this.handleChange}
              value={this.props.singleUser.shippingAddressName}
            />
            <label htmlFor="shippingAddressStreet">Street Address: </label>
            <input
              name="shippingAddressStreet"
              onChange={this.handleChange}
              value={this.props.singleUser.shippingAddressStreet}
            />
            <label htmlFor="shippingAddressCity">City: </label>
            <input
              name="shippingAddressCity"
              onChange={this.handleChange}
              value={this.props.singleUser.shippingAddressCity}
            />
            <label htmlFor="shippingAddressState">State: </label>
            <input
              name="shippingAddressCity"
              onChange={this.handleChange}
              value={this.props.singleUser.shippingAddressCity}
            />
            <label htmlFor="shippingAddressZip">Zip Code: </label>
            <input
              name="shippingAddressZip"
              onChange={this.handleChange}
              value={this.props.singleUser.shippingAddressZip}
            />
          </form>
        </div>
        <div>
          <h1>Billing Info</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="billingAddressName">Name: </label>
            <input
              name="billingAddressName"
              onChange={this.handleChange}
              value={this.props.singleUser.billingAddressName}
            />
            <label htmlFor="billingAddressStreet">Street Address: </label>
            <input
              name="billingAddressStreet"
              onChange={this.handleChange}
              value={this.props.singleUser.billingAddressStreet}
            />
            <label htmlFor="billingAddressCity">City: </label>
            <input
              name="billingAddressCity"
              onChange={this.handleChange}
              value={this.props.singleUser.billingAddressCity}
            />
            <label htmlFor="billingAddressState">State: </label>
            <input
              name="billingAddressCity"
              onChange={this.handleChange}
              value={this.props.singleUser.billingAddressCity}
            />
            <label htmlFor="billingAddressZip">Zip Code: </label>
            <input
              name="billingAddressZip"
              onChange={this.handleChange}
              value={this.props.singleUser.billingAddressZip}
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleUser: state.singleUser,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => ({
  loadCart: (userId, orderId) => dispatch(fetchCart(userId, orderId)),
  loadUserInfo: (userId) => dispatch(fetchUser(userId)),
  updateOrderInfo: (order) => dispatch(checkoutCart(order)),
  updateUserInfo: (userId, user) => dispatch(updateAccount(userId, user)),
});

export default connect(mapState, mapDispatch)(Checkout);
