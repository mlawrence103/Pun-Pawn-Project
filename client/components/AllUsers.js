import React from "react"
import { connect } from "react-redux"
import { fetchUsers } from "../store/allUsers"

class AllUsers extends React.Component {
  componentDidMount(){
    console.log('componentDidMount')
    this.props.fetchUsers()
  }
  render() {
    return (
      <div>
        <h1>All Users:</h1>
        <ul className="listAll">
            {this.props.allUsers.map((user) => (
                <li key={user.id} >
                    <h2>User: {user.firstName} {user.lastName}</h2>
                </li>))
            }
        </ul>
      </div>
      )
  }
}

const mapState = (state) => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatch = (dispatch) => {
  return ({
    fetchUsers: () => dispatch(fetchUsers())
  })
}

export default connect(mapState, mapDispatch)(AllUsers);
