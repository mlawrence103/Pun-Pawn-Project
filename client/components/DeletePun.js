import React from 'react';

export default class DeletePun extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  render() {
    return (
      <button
        type="submit"
        className="deleteButton"
        onClick={() => this.handleDelete(punId)}
      ></button>
    );
  }
}
