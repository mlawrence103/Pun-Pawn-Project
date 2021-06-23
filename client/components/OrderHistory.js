import React from 'react';
import { connect } from 'react-redux';
import { fetchOrderHistory } from '../store/order-history';

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.fetchOrderHistory(this.props.userId)
  }

  render() {
    return (
      <div>
        <h1>Order History:</h1>
        <ul className="listAll">
          {this.props.orders.map((order) => (
            <div className="order-in-history" key={order.id}>
                <h4>order number {order.id}</h4>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
      orders: order,
      userId: state.auth.id
    }
};

const mapDispatch = (dispatch) => {
  return {
      fetchOrderHistory: (userId) => fetchOrderHistory(userId)
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);
