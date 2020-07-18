import React from 'react'
import {Route} from 'react-router-dom'
import Login from './Login'

//
const PrivateRoute = ({ component: Component, authedUser, ...rest }) => {

  return (<Route
      {...rest}
      render={(props) => (
          authedUser !== null
          ? <Component {...props} />
          : <Login/>
      )}
  />)
}

//
export default PrivateRoute