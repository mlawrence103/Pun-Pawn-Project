import React from 'react';
import { connect } from 'react-redux';
import { createPun } from '../store/allPuns';

class CreatePun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      author: '',
      price: null,
      quantity: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    console.log('HERE in CREATE PUN');
    const { handleChange, handleSubmit } = this;
    const { content, author, price, quantity } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit} id="create-pun-form">
          <h3>Add New Pun to Inventory</h3>
          <div id="pun-content">
            <label htmlFor="pun-content">
              <small>Content</small>
            </label>
            <input
              name="punContent"
              type="text"
              onChange={handleChange}
              value={content}
            />
          </div>
          <div id="pun-author">
            <label htmlFor="pun-author">
              <small>Author</small>
            </label>
            <input
              name="punAuthor"
              type="text"
              onChange={handleChange}
              value={author}
            />
          </div>
          <div id="pun-price">
            <label htmlFor="pun-price">
              <small>Price (in cents)</small>
            </label>
            <input
              name="punPrice"
              type="text"
              onChange={handleChange}
              value={price}
            />
          </div>
          <div id="pun-quantity">
            <label htmlFor="pun-content">
              <small>Quantity Available</small>
            </label>
            <input
              name="punQuantity"
              type="text"
              onChange={handleChange}
              value={quantity}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createPun: (pun) => dispatch(createPun(pun, history)),
});

export default connect(null, mapDispatchToProps)(CreatePun);
