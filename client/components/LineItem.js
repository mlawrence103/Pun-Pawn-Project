import React from 'react';
import { connect } from 'react-redux';
import { editItemQty, deleteFromCart } from '../store/order';

class LineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    const quantity = event.target.value;
    const { punId, orderId } = this.props.lineItem.lineItem;
    const price = this.props.lineItem.price;
    this.setState({
      [event.target.name]: quantity,
    });
    this.props.updateLineItem(punId, orderId, quantity, price);
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
    console.log('props in line item: ', this.props.lineItem);
    const { lineItem } = this.props;
    const { handleChange, handleDelete } = this;
    const { quantity } = this.state;
    return (
      <div className="cart-item">
        <h4>{lineItem.content}</h4>
        <h5>Quantity:</h5>
        <input
          name="quantity"
          type="text"
          onChange={handleChange}
          value={quantity}
        />
        <h5>${lineItem.price / 100}</h5>
        <button
          onClick={() =>
            this.props.deleteLineItem(
              lineItem.lineItem.punId,
              lineItem.lineItem.orderId
            )
          }
        >
          Remove
        </button>
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
