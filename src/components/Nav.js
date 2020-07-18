import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

//
function Nav(props) {

  //
  const { users,  authedUser } = props
  const loggedUser = authedUser ? users[authedUser]: {}

  //
  return (
    <div>
      <div className='inspacious'><b>Would You Rather Game</b></div>
      <nav className='nav'>
        {authedUser !== null
          ? <div>
              <ul>
                <li>
                  <img src={loggedUser.avatarURL} alt='loggedUserAvatar' className="avatar" />
                </li>
                <li>
                    <span  className='nav-plain' > Hi! {loggedUser.name}</span>
                </li>
                <li>
                  <NavLink to='/logout' activeClassName='active'>
                    Logout
                  </NavLink>
                </li>
              </ul>
              <ul>
                <li>
                  <NavLink to='/' exact activeClassName='active'>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/add' activeClassName='active'>
                    NewQuestion
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/leaderboard' activeClassName='active'>
                    LeaderBoard
                  </NavLink>
                </li>
              </ul>
            </div>
          : ''
        }
      </nav>
    </div>
  )

}//class

//
function mapStateToProps ({ users, authedUser }) {
  return { 
    users,  
    authedUser: authedUser
  }
}

//
export default connect(mapStateToProps)(Nav)