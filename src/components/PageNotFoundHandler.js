import React, { Component } from 'react'
import { Link, useLocation, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PageNotFound from './PageNotFound'
import ForceLoginPage from './ForceLoginPage'
import { setRedirRoute } from '../actions/routeTrack'
import { setAuthedUser } from "../actions/authedUser"

//
//function PageNotFound() {
class PageNotFoundHandler extends Component {

  //stores the redirRoute in store
  storeRedirRoute = (rR) => {
    const { dispatch } = this.props

    //store redir route
    dispatch(setRedirRoute(rR))
  }

  //clear authed user
  forceLogout = () => {
    //e1.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  }

  //render
  render() {
    //
    const { authedUser, redirRoute, location } = this.props

    //console.log('askLogin:', askLogin)
    //console.log('redirRoute:', redirRoute)
    //console.log('location path:', location.pathname)
    //console.log('history path:', history)

    //set redir is blank ask for clear autheduser and login
    if (redirRoute === null ) {
      this.forceLogout()
      this.storeRedirRoute(location.pathname)
      return (
        <div>
          <ForceLoginPage />
        </div>
      )    
    }

    //if redir exists but not yet authenticated, authenticate
    if (redirRoute !== null && authedUser === null) {
      return (
        <div>
          <ForceLoginPage />
        </div>
      )    
    }

    //when reauthenticated...show page not found
    if (redirRoute !== null && authedUser !== null) {
      return (
        <div>
          <PageNotFound />
        </div>
      )    
    }

  }//render


}//class

//
function mapStateToProps({ authedUser, redirRoute }){ 

  //
  return {
    authedUser, redirRoute
  }

}

//
export default connect(mapStateToProps)(PageNotFoundHandler)