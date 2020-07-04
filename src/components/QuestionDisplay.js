import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class QuestionDisplay extends Component {

  //
  render() {

    //const {authedUser, loggedUser, question, authorAvatarURL} = this.props
    const {authedUser, question, authorAvatarURL} = this.props

    //redirect to login when not logged in
    if (authedUser === null) {
      return <Redirect to='/login' />
    } 

    //
    return (
      <div  className='question'>
        <div><img src={authorAvatarURL} alt='authorAvatar' className="avatar" /></div>
        <div className='question-info'>
          <div>Question Author: {question.author}</div>
          <div><b>Would you rather...</b></div>
          <div>Option <b>One</b>: {question.optionOne.text}?</div>
          <div>OR</div>
          <div>Option <b>Two</b>: {question.optionTwo.text}?</div>
        </div>
      </div>
    )
  }//render

}//class Question

//
function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id]
  const author = question.author
  const authorAvatarURL = users[author].avatarURL

  return {
    authedUser,
    question,
    authorAvatarURL
  }
}

//
export default connect(mapStateToProps)(QuestionDisplay)

