import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionAnswer from './QuestionAnswer'
import QuestionResult from './QuestionResult'
import { Redirect } from 'react-router-dom'

//
class QuestionHandler extends Component {

  //
  render() {

    const { id, authedUser, questionIsAnswered } = this.props

    //redirect to login when not logged in
    if (authedUser === null) {
      return <Redirect to='/login' />
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
function mapStateToProps({questions, authedUser}, props ){
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

  //console.log(answeredQuestionIDs)
  //console.log(id)
  //console.log('questionIsAnswered: ', questionIsAnswered)

  return {
    id,
    authedUser,
    questionIsAnswered
  }

}

//
export default connect(mapStateToProps)(QuestionHandler)