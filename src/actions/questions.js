import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addAnswerToUser, addQuestionToUser } from '../actions/users'; 

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

//
export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

//
export function handleAnswerQuestion(info){
  console.log(info)
  return (dispatch) => {
    //state update
    dispatch(answerQuestion(info))
    dispatch(addAnswerToUser(info))
    //api update
    saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleAnswerQuestion: ', e)
        dispatch(answerQuestion(info))
        alert('There was an error saving question answer. Try again.')
      })
  }
}

//
export function handleAddQuestion (textOne, textTwo, authedUser ) {
  return (dispatch) => {
    //show loading
    dispatch(showLoading())

    //api call
    return saveQuestion({
      optionOneText: textOne,
      optionTwoText: textTwo,
      author: authedUser
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addQuestionToUser(question))
      })
      .then(() => dispatch(hideLoading()))
  }
}


//state update only
export function answerQuestion ({ authedUser, id, option }) {
  return {
    type: ANSWER_QUESTION,
    id,
    option,
    authedUser
  }
}

//
function addQuestion (question) {
  console.log('BRAND new question is',question)
  return {
    type: ADD_QUESTION,
    question,
  }
}

