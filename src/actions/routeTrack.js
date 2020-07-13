export const SET_REDIR_ROUTE = 'SET_REDIR_ROUTE'

export function setRedirRoute (route) {
  return {
    type: SET_REDIR_ROUTE,
    route,
  }
}