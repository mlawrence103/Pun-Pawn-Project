import React from "react"
import { connect } from "react-redux"
import { fetchPuns } from "../store/allPuns"

class AllPuns extends React.Component {
  componentDidMount(){
    console.log('componentDidMount')
    this.props.fetchPuns()
  }
  render() {
    return (
      <div>
        <h1>Puns:</h1>
        <ul className="listAll">
            {this.props.allPuns.map((pun) => (
                <li key={pun.id} >
                    <h2>Pun: {pun.content}</h2>
                </li>))
            }
        </ul>
      </div>
      )
  }
}

const mapState = (state) => {
  return {
    allPuns: state.allPuns
  }
}

const mapDispatch = (dispatch) => {
  return ({
    fetchPuns: () => dispatch(fetchPuns())
  })
}

export default connect(mapState, mapDispatch)(AllPuns);
