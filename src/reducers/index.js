import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import questions from './questions'
import redirRoute from './routeTrack'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  authedUser,
  redirRoute,
  users,
  questions,
  loadingBar: loadingBarReducer
})
