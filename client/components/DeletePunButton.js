import React from 'react';
import { connect } from 'react-redux';
import { deletePun } from '../store/AllPuns';

class DeletePunButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    this.props.deletePun(id);
  }
  render() {
    return (
      <button
        type="submit"
        className="deleteButton"
        onClick={() => this.handleDelete(this.props.id)}
      >
        Delete
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  deletePun: (pun) => dispatch(deletePun(pun, history)),
});

export default connect(null, mapDispatchToProps)(DeletePunButton);
