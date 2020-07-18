import React from 'react'
import { connect } from 'react-redux'
import { getUserTally } from '../utils/helpers.js'

//
function LeaderBoard(props) {

  //
  const { userTally } = props 

  return (
    <ol>
      {
        userTally.map((user) => (
          <div key={user.name} className='question-score'>
            <div><img src={user.avatarURL}  alt='userAvatar' className="avatar" /></div>
            <div className='question-score-info'>
              <div><b>Name</b>: {user.name}</div>
              <div><b>NumberOfQuestions</b>: {user.numOfQuestions}</div>
              <div><b>NumberOfAnswers</b>: {user.numOfAnswers}</div>
              <div className='question-total'><b>Total Score</b>: {user.score}</div>
            </div>
          </div>
        ))
      }
    </ol>
  )

}//class


//
function mapStateToProps({ users }){

  //
  const userTally = getUserTally(users)
  //console.log('this userTally is:', userTally)

  return {
    userTally
  } 

}

//
export default connect(mapStateToProps)(LeaderBoard)

