import React from 'react';
import Navbar from './components/Navbar';
import AdminNavBar from './components/AdminNavbar';
import { connect } from 'react-redux';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.isAdmin ? <AdminNavBar /> : <Navbar />}
        <Routes />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isAdmin: state.auth.userType === 'ADMIN',
  };
};

export default connect(mapState)(App);
