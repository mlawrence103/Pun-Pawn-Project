import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPuns } from '../store/allPuns';
import DeletePunButton from './DeletePunButton';
import {
  fetchUserCart,
  fetchGuestCart,
  addToCart,
  createCart,
} from '../store/order';

class AdminAllPuns extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPuns();
  }

  render() {
    return (
      <div>
        <h1>Puns:</h1>
        <ul className="listAllPuns">
          {this.props.allPuns.map((pun) => (
            <div className="single-pun-in-list" key={pun.id}>
              <Link to={`/admin/puns/${pun.id}/edit`}>
                <h2>{pun.content}</h2>
              </Link>
              <h5>${pun.price / 100}</h5>
              {this.props.isAdmin ? (
                <div className="admin-edit-inventory-buttons">
                  <button>
                    <Link to={`/admin/puns/${pun.id}/edit`}>Edit</Link>
                  </button>
                  <DeletePunButton id={pun.id} />
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    allPuns: state.allPuns,
    isLoggedIn: !!state.auth.id,
    user: state.auth,
    order: state.order,
    isAdmin: state.auth.userType === 'ADMIN',
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPuns: () => dispatch(fetchPuns()),
    addToCart: (punId, orderId, qty, price) =>
      dispatch(addToCart(punId, orderId, qty, price)),
    fetchUserCart: (userId) => dispatch(fetchUserCart(userId)),
    fetchGuestCart: (orderId) => dispatch(fetchGuestCart(orderId)),
    createCart: (userInfo) => dispatch(createCart(userInfo)),
  };
};

export default connect(mapState, mapDispatch)(AdminAllPuns);
