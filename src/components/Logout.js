import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from "../actions/authedUser";

class Logout extends Component {

  //
  state = {
    stay: false //stay after logout intent
  }

  //
  handleLogout = (e1) => {
    e1.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  }

    //
    stayInTheGame = (e2) => {
      e2.preventDefault();

    //set state to stay
    this.setState(() => ({
      stay: true
    }))

      return <Redirect to= '/' />
    }

  //
  render() {

    const authedUser = this.props.authedUser

    //go to login if not logged in
    if (authedUser === null) {
      return <Redirect to= '/login' />
    }

    //if stay...go home
    if (this.state.stay === true) {
      return <Redirect to= '/' />
    }    


    return(
      <div>
        <div><b>LOGOUT_SCREEN</b></div>
        <div>Are you sure about logging out?</div>
        <button
          className='btn'
          type='submit'
          onClick={this.handleLogout}>
            YES
        </button>
        <button
          className='btn'
          type='submit'
          onClick={this.stayInTheGame}>
            NO
        </button>
      </div>
    )
  }

}//class

//
function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

//
export default connect(mapStateToProps)(Logout)