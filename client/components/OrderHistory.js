import React from 'react';
import { connect } from 'react-redux';
import { fetchOrderHistory } from '../store/order-history';

class OrderHistory extends React.Component {
  componentDidMount() {
    console.log(this.props.userId)  
    this.props.fetchOrderHistory(this.props.userId)
    }

  render() {
    return (
      <div>
        <h1>Order History:</h1>
        <ul className="listAll">
          {this.props.orders ? (this.props.orders.map((order) => (
            <div className="order-in-history" key={order.id}>
                <h4>order number {order.id}</h4>
            </div>
          ))) : (<h1>no orders to show</h1>)}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
      orders: state.orders,
      userId: state.auth.id
    }
};

const mapDispatch = (dispatch) => {
  return {
      fetchOrderHistory: (userId) => dispatch(fetchOrderHistory(userId))
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);
