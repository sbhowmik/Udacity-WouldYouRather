import { RECEIVE_USERS, 
          ADD_ANSWER_TO_USER, 
          ADD_QUESTION_TO_USER 
        } from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case ADD_ANSWER_TO_USER:
      const id = action.id
      const answer = action.option
      const authedUser = action.authedUser      
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [id]: answer
          }
        }
      }
    case ADD_QUESTION_TO_USER:
      const { question } = action
      const author = question.author
      const questionID = question.id
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(questionID)
        }
      }
    default :
    return state
  }
}