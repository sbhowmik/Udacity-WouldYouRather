import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import QuestionDisplay from './QuestionDisplay'

//
class QuestionsAnswered extends Component {

  //
  render() {

    const { authedUser, questionIDs }  = this.props //.questionIDs
    console.log(questionIDs)

    //if not logged in go to Login screen
    if(authedUser === null){
      return <Redirect to= '/login' />
    }

    //
    return (
      <div>
      <b>You have already Attempted below Question..</b>
      {
        questionIDs.map((qid) => (
            <div key={qid}>
              <QuestionDisplay id={qid} />
              <Link to={`/questions/${qid}`}>
                <button className='btn-q'>See Question Statistics</button>
              </Link>
            </div>
        ))
      }
      </div>
    )//return
  }//render


}//QuestionBoard

//
function mapStateToProps ({questions, authedUser}) {
  //determine answered questions
  const questionIDs = Object.keys(questions).filter((id) => {
    return (questions[id].optionOne.votes.includes(authedUser) ||
    questions[id].optionTwo.votes.includes(authedUser)
    )
  })
  
  return {
    authedUser,
     questionIDs: questionIDs.sort((a,b) => (questions[b].timestamp - questions[a].timestamp)) 
  }
}

//
export default connect(mapStateToProps)(QuestionsAnswered)