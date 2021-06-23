import React from 'react';
import { connect } from 'react-redux';
import { createPun } from '../store/allPuns';

class EditPun extends React.Component {
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
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createPun({ ...this.state });
  }
  render() {
    const { handleChange, handleSubmit } = this;
    const { content, author, price, quantity } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit} id="create-pun-form">
          <h3>Add New Pun to Inventory</h3>
          <div id="pun-content">
            <label htmlFor="content">
              <small>Content</small>
            </label>
            <input
              name="content"
              type="text"
              onChange={handleChange}
              value={content}
            />
          </div>
          <div id="pun-author">
            <label htmlFor="author">
              <small>Author</small>
            </label>
            <input
              name="author"
              type="text"
              onChange={handleChange}
              value={author}
            />
          </div>
          <div id="pun-price">
            <label htmlFor="price">
              <small>Price (in cents)</small>
            </label>
            <input
              name="price"
              type="text"
              onChange={handleChange}
              value={price}
            />
          </div>
          <div id="pun-quantity">
            <label htmlFor="quantity">
              <small>Quantity Available</small>
            </label>
            <input
              name="quantity"
              type="text"
              onChange={handleChange}
              value={quantity}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createPun: (pun) => dispatch(createPun(pun, history)),
});

export default connect(null, mapDispatchToProps)(EditPun);
