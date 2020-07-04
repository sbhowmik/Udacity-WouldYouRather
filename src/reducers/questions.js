import { 
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION,
  ADD_QUESTION
} from '../actions/questions'

export default function questions (state = {}, action) {
  switch (action.type) {
    //
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      }
    //
    case ADD_QUESTION : 
      const { question } = action

      //console.log(question)
      return {
        ...state,
        ...questions, 
        [question.id]: question
      }
    //
    case ANSWER_QUESTION :
      const id = action.id
      const option = action.option
      const authedUser = action.authedUser
      return {
        ...state,
        [id]: {
          ...state[id], 
          [option]: {
            ...state[id][option],
            votes: state[id][option].votes.concat([authedUser])
          }
        }
      }
    //
    default :
      return state
  }
}