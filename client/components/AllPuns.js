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
        <ul className="listAll">
            {this.props.allPuns.map((pun) => (
                <li>
                    <h1>Pun: {pun.content}</h1>
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
