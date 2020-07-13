import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionAnswer from './QuestionAnswer'
import QuestionResult from './QuestionResult'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from "../actions/authedUser"
import { setRedirRoute } from '../actions/routeTrack'
import ForceLoginPage from './ForceLoginPage'
import PageNotFound from './PageNotFound'

//
class QuestionHandler extends Component {

  //clear authed user
  forceLogout = () => {
    //e1.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  }

  //stores the redirRoute in store
  storeRedirRoute = (rR) => {
    const { dispatch } = this.props

    //store redir route
    dispatch(setRedirRoute(rR))
  }

  //
  render() {

    const { id, authedUser, questionExists, questionIsAnswered, redirRoute, location } = this.props

    //
    //console.log('location path:', location.pathname)

    //redirect to page not found if not exits & redirect not yet set
    if (questionExists === false && redirRoute === null ) {
      this.forceLogout()
      this.storeRedirRoute(location.pathname)
      return (
        <div>
          <ForceLoginPage />
        </div>
      )  
    } 

    //if redir exists but not yet authenticated, authenticate
    if (questionExists === false && redirRoute !== null && authedUser === null) {
      return (
        <div>
          <ForceLoginPage />
        </div>
      )    
    }

    //when reauthenticated...show page not found
    if (questionExists === false && redirRoute !== null && authedUser !== null) {
      return (
        <div>
          <PageNotFound />
        </div>
      )    
    }

    //redirect to login when not logged in @ this stage
    if (authedUser === null) {
      return <Redirect to='/login' />
    } 

    //clear redirRoute when question exists
    if (questionExists === true && redirRoute !== null) {
      this.storeRedirRoute(null)
    }

    return (
      <div>
        {questionIsAnswered === false 
          ? <QuestionAnswer id={id} />
          : <QuestionResult id={id} />
        }
      </div> 
    )
  }

}//class

//
function mapStateToProps({questions, authedUser, redirRoute}, props ){
  const { id } = props.match.params
  //TO DETERMINE IF QUESTION IS ANSWERED
  //find answered question IDs
  const answeredQuestionIDs = Object.keys(questions).filter((id) => {
    return (questions[id].optionOne.votes.includes(authedUser) ||
    questions[id].optionTwo.votes.includes(authedUser)
    )
  })
  //determine if question is answered
  const questionIsAnswered = answeredQuestionIDs.includes(id)
 
  //find if this question exists
  const thisQuestion = questions[id]
  const questionExists = thisQuestion !== undefined ? true : false 

  //console.log(answeredQuestionIDs)
  //console.log(id)
  //console.log('questionIsAnswered: ', questionIsAnswered)
  //console.log('questionExists: ', questionExists)

  return {
    id,
    authedUser,
    questionExists,
    questionIsAnswered,
    redirRoute
  }

}//mapStateToProps

//
export default connect(mapStateToProps)(QuestionHandler)