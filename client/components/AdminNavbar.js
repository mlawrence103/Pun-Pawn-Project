import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const AdminNavbar = ({ handleClick, isAdmin }) => (
  <div>
    <nav>
      {/* The navbar will show these if an admin is logged in*/}
      <Link to="/admin/user-list">View All Users</Link>
      <Link to="/admin/add-pun">Add New Pun</Link>
      <Link to="/admin/edit-inventory">Edit Inventory</Link>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(AdminNavbar);
