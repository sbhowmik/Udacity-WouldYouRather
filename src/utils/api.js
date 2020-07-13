import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from './_DATA.js'

//
export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}


//
export function saveQuestionAnswer (info) {
  //console.log('API')
  //console.log(info)

  return _saveQuestionAnswer({
    authedUser: info.authedUser,
    qid: info.id,
    answer: info.option
  })
}


//
export function saveQuestion (info) {
  return _saveQuestion(info)
}