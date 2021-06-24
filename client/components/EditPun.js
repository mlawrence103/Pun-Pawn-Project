import React from 'react';
import { connect } from 'react-redux';
import { updatePun, fetchSinglePun } from '../store/singlePun';

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
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updatePun({ ...this.state });
  }

  async componentDidMount() {
    const pun = await this.props.fetchPun(this.props.match.params.id);
    this.setState({ ...this.props.pun });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { content, author, price, quantity } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit} id="create-pun-form">
          <h3>Edit Pun</h3>
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

const mapStateToProps = (state) => {
  return {
    pun: state.singlePun,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  fetchPun: (id) => dispatch(fetchSinglePun(id)),
  updatePun: (pun) => dispatch(updatePun(pun, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPun);
