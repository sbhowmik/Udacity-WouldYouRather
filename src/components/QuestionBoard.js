import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionsUnanswered from './QuestionsUnanswered'
import QuestionsAnswered from './QuestionsAnswered'
import { setRedirRoute } from '../actions/routeTrack'

//
class QuestionBoard extends Component {

  //
  state = {
    showUnanswered: true
  }

  //
  showUnanswered = () => {
    //set state to stay
    this.setState(() => ({
      showUnanswered: true
    }))    
  }

  //
  showAnswered = () => {
    //set state to stay
    this.setState(() => ({
      showUnanswered: false
    }))    
  }

  //
  storeRedirRoute = (rR) => {
    const { dispatch } = this.props

    //store redir route
    dispatch(setRedirRoute(rR))
  }

  //render function
  render() {

    const { authedUser, redirRoute } = this.props 
    const showUnanswered = this.state.showUnanswered

    //if redirRoute is not null..set it null (garbage clear from previous page not found)
    if (redirRoute !== null) {
      this.storeRedirRoute(null)
    }

    //redirect to login when not logged in
    if (authedUser === null) {
      return <Redirect to='/login' />
    }    

    //
    return (
      <div>
        <button
          className='btn'
          type='submit'
          onClick={this.showUnanswered}>
            UNANSWERED
        </button>
        <button
          className='btn'
          type='submit'
          onClick={this.showAnswered}>
            ANSWERED
        </button>
        {showUnanswered === true 
          ? <QuestionsUnanswered />
          : <QuestionsAnswered />
        }
      </div>
    )//return
  }//render


}//QuestionBoard

//
function mapStateToProps ({ authedUser, redirRoute }) {
  return {
    authedUser
  }
}

//
export default connect(mapStateToProps)(QuestionBoard)
