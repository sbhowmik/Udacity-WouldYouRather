import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionDisplay from './QuestionDisplay'
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti/index'
import { handleAnswerQuestion } from '../actions/questions'
import { Link } from 'react-router-dom'

class QuestionAnswer extends Component {

  //state
  state = {
    answered: false,
    myChoice: ''
  }

  //handleAnswer
  handleAnswer = (e, id, choice) => {

    this.setState (() => ({
      answered: true,
      myChoice: choice
    }))

    console.log('liked option for: ', id, ' is: ', choice)

    const {dispatch, authedUser} = this.props

    //console.log('au: ', authedUser)
    //console.log('qid: ', id)
    //console.log('answer: ', choice)

    //dispatch Event
    dispatch(handleAnswerQuestion({
      authedUser: authedUser,
      id: id,
      option: choice
    }))
  }

  //
  render() {

    const { id } = this.props

    const { answered, myChoice } = this.state

    console.log(myChoice)

    let oneIsChoice = false
    let twoIsChoice = false

    if (answered === true && myChoice === 'optionOne' ) {
      oneIsChoice = true
    } else if (answered === true && myChoice === 'optionTwo' ) {
      twoIsChoice = true
    }

    //
    return (
      <div>
        <QuestionDisplay id={id} />
        <div>
          <div className={answered === false ? 'choice-alert' : ''}>Click on heart sign corresponding to your choice...</div>
          <div>
            Do you choose Option <b>One</b> ?
            <button className='heart-button' onClick={(e) => this.handleAnswer(e, id, 'optionOne')}>
              {oneIsChoice === false
                ? <TiHeartOutline className='question-icon' />
                : <TiHeartFullOutline color='#e0245e' className='question-icon' />
              }
            </button>
          </div>
          <div>
            Do you choose Option <b>Two</b> ?
            <button className='heart-button' onClick={(e) => this.handleAnswer(e, id, 'optionTwo')}>
              {twoIsChoice === false
                ? <TiHeartOutline className='question-icon' />
                : <TiHeartFullOutline color='#e0245e' className='question-icon' />
              }
            </button>
          </div>
          <div>
            {answered === true
              ? <Link to={`/question/${id}`}>
                  <button className='btn'>SHOW THIS POLL's RESULT</button>
                </Link>
              : ''
            }
          </div>
        </div>
      </div> 
    )
  }

}//class

//
function mapStateToProps({authedUser}, { id } ){

  return {
    id,
    authedUser
  }

}

//
export default connect(mapStateToProps)(QuestionAnswer)