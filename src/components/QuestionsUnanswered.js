import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import QuestionDisplay from './QuestionDisplay'

//
function QuestionsUnanswered(props) {

  //
  const { authedUser, questionIDs } = props //.questionIDs
  //console.log(questionIDs)

  //if not logged in go to Login screen
  if(authedUser === null){
    return <Redirect to= '/login' />
  }

  //
  return (
    <div>
    <b>Attempt below Unanswered Question..</b>
    { questionIDs.length ?
        (questionIDs.map((qid) => (
        <div key={qid}>
          <QuestionDisplay id={qid} />
          <Link to={`/questions/${qid}`}>
            <button className='btn-q'>Answer Question</button>
          </Link>
        </div>
      ))) : <div className='spacious'><i>Great, you have completed answering all questions!!</i></div>
    }
    </div>
  )//return

}//QuestionBoard

//
function mapStateToProps ({questions, authedUser}) {
  //determine unanswered questions ids
  const questionIDs = Object.keys(questions).filter((id) => {
    return (!(questions[id].optionOne.votes.includes(authedUser) ||
    questions[id].optionTwo.votes.includes(authedUser)
    ))
  })
  
  return {
     authedUser,
     questionIDs:  questionIDs.sort((a,b) => (questions[b].timestamp - questions[a].timestamp))
  }
}

//
export default connect(mapStateToProps)(QuestionsUnanswered)
