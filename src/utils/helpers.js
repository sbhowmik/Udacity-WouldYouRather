//
export function getQuestionInfos(authedUser, question) {
  const { optionOne, optionTwo } = question
  const optionOneVote = optionOne.votes.length
  const optionTwoVote = optionTwo.votes.length
  const totalVote = optionOneVote + optionTwoVote
  const userVoted = optionOne.votes.includes(authedUser) ? 'One' : 'Two'

  return {
    optionOneVote,
    optionTwoVote,
    totalVote,
    userVoted
  }
}

//
export function getUserTally(users) {

  //generate the user Tally
  const userTally = Object.keys(users).map(id => {

    //get this user
    const thisUser = users[id]
    //get this user's details
    const name = thisUser.name
    const avatarURL = thisUser.avatarURL
    const numOfAnswers = Object.keys(thisUser.answers).length
    const numOfQuestions = thisUser.questions.length
    const score = numOfAnswers + numOfQuestions

    return ({
      name: name,
      avatarURL: avatarURL,
      numOfAnswers: numOfAnswers,
      numOfQuestions: numOfQuestions,
      score: score
    })
  })   

  //console.log('pre sort check:', userTally)
  userTally.sort((a,b) => b.score - a.score)

  return userTally //returns array of modified User Objects

}//fn getUserTally
