import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import '../index.css'

class NavQuestion extends Component {

  //
  render() {

    const { authedUser } = this.props //.questionIDs 

    //if not logged in go to Login screen
    if(authedUser === null){
      
      return <Redirect to= '/login' />
    }

   return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/unanswered' activeClassName='active'>
              UnansweredQuestion
            </NavLink>
          </li>
          <li>
            <NavLink to='/answered' activeClassName='active'>
              AnsweredQuestion
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }//render

}//class

//
function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

//
export default connect(mapStateToProps)(NavQuestion)