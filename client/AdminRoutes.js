import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import AllUsers from './components/AllUsers';
import AdminAllPuns from './components/AdminAllPuns';
import CreatePun from './components/CreatePun';
import EditPun from './components/EditPun';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/admin/add-pun" component={CreatePun} />
          <Route exact path="/admin/user-list" component={AllUsers} />
          <Route exact path="/admin/edit-inventory" component={AdminAllPuns} />
          <Route exact path="/admin/puns/:id/edit" component={EditPun} />
        </Switch>
      </div>
    );
  }
}

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
    loadInitialData() {
      dispatch(me());
    },
  };
};


export default withRouter(connect(mapState, mapDispatch)(Routes));
