import React from 'react';
import { connect } from 'react-redux';
import { editItemQty, deleteFromCart } from '../store/order';

class LineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
  }

  decreaseQuantity(punId, orderId, qty, price) {
    this.props.updateLineItem(punId, orderId, qty, price);
  }

  increaseQuantity(punId, orderId, qty, price) {
    console.log(punId, orderId, qty, price);
    this.props.updateLineItem(punId, orderId, qty, price);
  }

  handleDelete(punId, orderId) {
    console.log(
      `in handle delete line item with punId: ${punId} and orderId: ${orderId}`
    );
    this.props.deleteLineItem(punId, orderId);
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.lineItem.lineItem.quantity,
    });
  }

  render() {
    const { lineItem } = this.props;
    const { increaseQuantity, decreaseQuantity, handleDelete } = this;
    const punId = this.props.lineItem.lineItem.punId;
    const orderId = this.props.lineItem.lineItem.orderId;
    return (
      <div className="cart-item">
        <h4>{lineItem.content}</h4>
        <h5>Quantity:</h5>
        <button
          onClick={() => decreaseQuantity(punId, orderId, -1, lineItem.price)}
        >
          -
        </button>
        <h5>{lineItem.lineItem.quantity}</h5>
        <button
          onClick={() => increaseQuantity(punId, orderId, 1, lineItem.price)}
        >
          +
        </button>
        <h5>${lineItem.price / 100}</h5>
        <button onClick={() => handleDelete(punId, orderId)}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateLineItem: (punId, orderId, qty, price) =>
    dispatch(editItemQty(punId, orderId, qty, price)),
  deleteLineItem: (punId, orderId) => dispatch(deleteFromCart(punId, orderId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LineItem);
