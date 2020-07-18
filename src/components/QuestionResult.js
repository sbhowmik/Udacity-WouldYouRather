import React from 'react'
import { connect } from 'react-redux'
import QuestionDisplay from './QuestionDisplay'
import { getQuestionInfos } from '../utils/helpers.js'
import { Redirect } from 'react-router-dom'

//
function QuestionResult(props) {

  //
  const { authedUser, id, questionIsValid } = props

  //redirect to login when not logged in
  if (authedUser === null) {
    return <Redirect to='/login' />
  } 

  //if invalid question
  if (questionIsValid === false) {
    return (<div>INVALID QUESTION</div>)
  }

  //further data
  const { optionOneVote, optionTwoVote, totalVote, userVoted } = props.questionInfos

  const optOnePerc = ((optionOneVote/totalVote) * 100).toFixed(1)
  const optTwoPerc = ((optionTwoVote/totalVote) * 100).toFixed(1)

  return (
    <div>
      <QuestionDisplay id={id} />
      <div  className='question-vote' >    
        <div className='question-vote-info'>
          <b>Question's Poll Statistics:</b>
          <div>Option <b>One</b>: {optionOneVote} out of {totalVote} votes. {optOnePerc}%</div>
          <div>Option <b>Two</b>: {optionTwoVote} out of {totalVote} votes. {optTwoPerc}%</div>
          <div>You voted for Option: <b>{userVoted}</b></div>
          </div>
      </div>
    </div>
  )//return

}//class

//
function mapStateToProps({authedUser, questions}, { id } ){

  //const { id } = props.match.params
  const question = questions[id]
  let questionIsValid = false //assume invalid
  let questionInfos = null //& infos is null
  
  //console.log(authedUser)
  //console.log(question)
  
  if (question !== undefined) {
    questionIsValid = true
    questionInfos = getQuestionInfos(authedUser, question)
  }
  
  //console.log(questionInfos)
  //console.log(authedUser)
  return {
    authedUser,
    id,
    questionIsValid,
    questionInfos
  }

}

//
export default connect(mapStateToProps)(QuestionResult)