import React from "react";
import { connect } from "react-redux";
import { editUserType, fetchUsers } from "../store/allUsers";

class AllUsers extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.fetchUsers();
  }

  handleChange(e) {
    console.log("target name", e.target.name);
    console.log("target value", e.target.value);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const userId = e.target.name;
    const type = e.target.value;
    try {
      this.props.editUser(userId, type);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   await this.props.addCampus(campusToEnrollIn, this.props.student);
    //   const id = this.props.match.params.id;
    //   await this.props.loadSingleStudent(id);
    //   this.setState({
    //     enrolled: campusToEnrollIn[0],
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  render() {
    return (
      <div>
        <h1>All Users:</h1>
        <ul className="listAll">
          {this.props.allUsers.map((user) => (
            <li key={user.id}>
              <h2>
                User: {user.firstName} {user.lastName}
              </h2>
              <h3>User Type: {user.userType}</h3>
              <form onSubmit={this.handleSubmit}>
                <label>Edit User Type: </label>
                <select
                  name={user.id}
                  key={user.id}
                  onChange={this.handleChange}
                >
                  <option>MEMBER</option>
                  <option>ADMIN</option>
                </select>
                <input type="submit" value="Change" />
              </form>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    allUsers: state.allUsers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    editUser: (userId, type) => dispatch(editUserType(userId, type)),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
