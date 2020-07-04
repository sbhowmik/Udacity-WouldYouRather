import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

  //
  state = {
    userID: ''
  }

  //
  loginSubmitHandler = (e) => {
    e.preventDefault()

    //console.log('this LOGIN state is:', this.state.userID)

    //blank user id check
    if (this.state.userID === ''){
      return
    }

    this.props.dispatch(setAuthedUser(this.state.userID))
  }

  //
  loginSelectHandler = (loginValue) => {
    this.setState(() => ({
      userID: loginValue
    }))
  }

  //
  render() {

    const {authedUser, users} = this.props
    const userIDs = Object.keys(users)

    //redirect to home if already logged in
    if(authedUser !== null){
      return <Redirect to= '/' />
    }

    return(
      <div>
      <div className='spacious'><b>Welcome to the game</b></div>
      <div className='spacious'>Login as a Player Below..</div>
      <form className='login-form' onSubmit={this.loginSubmitHandler}>
        <select
          value={this.state.userID} 
          onChange={(event) => {this.loginSelectHandler(event.target.value)}}>
            <option key='selectAOption' value='selectAOption' >Choose an option from this DropDown..</option>
            {
              userIDs.map((id) => {
                return (
                  <option key={id} value={id} >{id}</option>
                  )               
              })
            }
        </select>
        <button
            className='btn'
            type='submit'>
              Submit
        </button>
      </form>
      </div>
    )
  }

}//class

//
function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

//
export default connect(mapStateToProps)(Login) 