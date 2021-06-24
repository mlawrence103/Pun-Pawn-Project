import React from 'react';
import { connect } from 'react-redux';
import { fetchUserCart, fetchGuestCart, checkoutCart } from '../store/order';
import LineItem from './LineItem';
import { fetchUser, updatingAccount } from '../store/singleUser';

// -local state includes payment info
// -shows items cart w/price and text (order reducer)
// -shipping info form (pre-populated for user, not for guest) (check user reducer)
// -billing info form (pre-populated for user, not for guest) (check user reducer)
export class Checkout extends React.Component {
  debugger 
  constructor() {
    super();
    this.state = {
      showBillingForm: false,
      email: '',
      shippingName: '',
      shippingStreet: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
      billingName: '',
      billingStreet: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveShipping = this.saveShipping.bind(this);
  }

  componentDidMount() {
      const { isLoggedIn } = this.props;
      if (isLoggedIn) {
        this.props.loadUserCart(this.props.userId);
        this.props.loadUserInfo(this.props.userId);
      } else {
        const currentGuestOrderId = parseInt(
          window.localStorage.getItem('currentOrderId')
        );
        this.props.loadGuestCart(currentGuestOrderId);
      }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  saveShipping(e) {
    e.preventDefault();
    this.props.updateOrderInfo(this.props.order);
    //billing info is only associated with user; should we include it in an order?
    // otherwise we are just going to update it from user info
    // this.props.userInfo(this.props.singleUser.this.props.singleUser)
    const {
      email,
      shippingName,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingZip,
    } = this.state;
    if (
      email.length &&
      shippingName.length &&
      shippingStreet.length &&
      shippingCity.length &&
      shippingState.length &&
      shippingZip.length
    ) {
      this.setState({ showBillingForm: true });
    }
  }

  render() {
    // console.log(this.state, 'state in checkout');
    console.log('props.user in checkout: ', this.props.user);
    const puns = this.props.order.puns || [];
    const { handleChange } = this;
    const {
      email,
      shippingName,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingZip,
      billingName,
      billingStreet,
      billingCity,
      billingState,
      billingZip,
    } = this.state;
    return (
      <div>
        <h1>Checkout</h1>
        <div>
          <h1>Cart</h1>
          {puns.map((lineItem) => {
            return (
              <div key={lineItem.punId + Math.ceil(Math.random()) * 1000}>
                <LineItem lineItem={lineItem} />
              </div>
            );
          })}
          <h3>Total: ${this.props.order.total / 100}</h3>
        </div>
        <div>
          <form onSubmit={this.saveShipping}>
            <h5>Shipping Info</h5>
            <div className="signup-address-info">
              <div>
                <div>
                  <label htmlFor="shippingName">
                    <small>Name</small>
                  </label>
                  <input
                    name="shippingName"
                    type="text"
                    onChange={handleChange}
                    value={shippingName}
                  />
                </div>
                <div>
                  <label htmlFor="email">
                    <small>Email</small>
                  </label>
                  <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={email}
                  />
                </div>
                <label htmlFor="shippingStreet">
                  <small>Street</small>
                </label>
                <input
                  name="shippingStreet"
                  type="text"
                  onChange={handleChange}
                  value={shippingStreet}
                />
              </div>
              <div>
                <label htmlFor="shippingCity">
                  <small>City</small>
                </label>
                <input
                  name="shippingCity"
                  type="text"
                  onChange={handleChange}
                  value={shippingCity}
                />
              </div>
              <div id="shippingDropdown">
                <label htmlFor="shippingState">
                  <small>State:</small>
                </label>
                <select name="shippingState" onChange={this.handleChange}>
                  <option value="none" selected disabled hidden>
                    Select State
                  </option>
                  {this.props.states.map((state, idx) => {
                    return (
                      <option key={idx} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="shippingZip">
                  <small>Zip Code</small>
                </label>
                <input
                  name="shippingZip"
                  type="text"
                  onChange={handleChange}
                  value={shippingZip}
                />
              </div>
            </div>
            <button type="submit">Continue to Billing</button>
          </form>
        </div>
        <div>
          <form>
            <h5>Billing Info</h5>
            <div className="signup-address-info">
              <div>
                <div>
                  <label htmlFor="billingName">
                    <small>Name</small>
                  </label>
                  <input name="billingName" type="text" />
                </div>
                <label htmlFor="billingStreet">
                  <small>Street</small>
                </label>
                <input name="billingStreet" type="text" />
              </div>
              <div>
                <label htmlFor="billingCity">
                  <small>City</small>
                </label>
                <input name="billingCity" type="text" />
              </div>
              <div id="billingDropdown">
                <label htmlFor="billingState">
                  <small>State:</small>
                </label>
                <select name="billingState" onChange={this.selectBillingState}>
                  <option value="none" selected disabled hidden>
                    Select State
                  </option>
                  {this.props.states.map((state, idx) => {
                    return (
                      <option key={idx} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="billingZip">
                  <small>Zip Code</small>
                </label>
                <input name="billingZip" type="text" />
              </div>
            </div>
            <div>
              <button id="signup-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log('checkout state in map state: ', state);
  return {
    user: state.auth,
    order: state.order,
    singleUser: state.singleUser,
    isLoggedIn: !!state.auth.userId,
    states: [
      'AL',
      'AK',
      'AS',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'DC',
      'FM',
      'FL',
      'GA',
      'GU',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MH',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'MP',
      'OH',
      'OK',
      'OR',
      'PW',
      'PA',
      'PR',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VI',
      'VA',
      'WA',
      'WV',
      'WI',
      'WY',
    ],
  };
};

const mapDispatch = (dispatch) => ({
  loadUserCart: (userId) => dispatch(fetchUserCart(userId)),
  loadGuestCart: (orderId) => dispatch(fetchGuestCart(orderId)),
  loadUserInfo: (userId) => dispatch(fetchUser(userId)),
  updateOrderInfo: (order) => dispatch(checkoutCart(order)),
  updateUserInfo: (userId, user) => dispatch(updateAccount(userId, user)),
});

export default connect(mapState, mapDispatch)(Checkout);
