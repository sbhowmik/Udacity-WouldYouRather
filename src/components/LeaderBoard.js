import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserTally } from '../utils/helpers.js'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {

  //
  render() {

    const { authedUser, userTally } = this.props 

    //console.log('this userTally is:', userTally)//
    //console.log('this autheduser is:', authedUser)//

    //redirect when not logged
    if (authedUser === null) {
      return <Redirect to='/login' />
    }

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
  }//render


}//class


//
function mapStateToProps({authedUser, users}){

  const userTally = getUserTally(users)
  //console.log('this userTally is:', userTally)

  return {
    authedUser,
    userTally
  } 

}

//
export default connect(mapStateToProps)(LeaderBoard)

