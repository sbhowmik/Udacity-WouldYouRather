import { SET_REDIR_ROUTE } from '../actions/routeTrack'

//
export default function redirRoute (state = null, action) {
  switch (action.type) {
    case SET_REDIR_ROUTE :
      return action.route
    default :
      return state
  }
}