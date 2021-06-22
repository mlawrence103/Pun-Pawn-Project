import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
class Signup extends React.Component {
  constructor(props) {
    super(props);
    state = {
      shippingState: '',
      billingState: '',
    };
    this.selectShippingState = this.selectShippingState.bind(this);
    this.selectBillingState = this.selectBillingState.bind(this);
  }

  selectShippingState(event) {
    this.setState({
      shippingState: parseInt(event.target.value),
    });
  }

  selectBillingState(event) {
    this.setState({
      billingState: parseInt(event.target.value),
    });
  }

  render() {
    const { name, displayName, handleSubmit, error } = props;

    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <h5>Shipping Info</h5>
          <div>
            <div>
              <label htmlFor="shippingName">
                <small>Name</small>
              </label>
              <input name="shippingName" type="text" />
            </div>
            <label htmlFor="shippingStreet">
              <small>Street</small>
            </label>
            <input name="shippingStreet" type="text" />
          </div>
          <div>
            <label htmlFor="shippingCity">
              <small>City</small>
            </label>
            <input name="shippingCity" type="text" />
          </div>
          <div id="shippingDropdown">
            <p>State:</p>
            <select name="shippingState" onChange={this.selectShppingState}>
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
            <input name="shippingZip" type="text" />
          </div>
          <h5>Billing Info</h5>
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
            <p>State:</p>
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
          <div>
            <button type="submit">Sign Up</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
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

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
