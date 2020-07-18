import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions.js'

//
class NewQuestion extends Component {

  //
  state = {
    textOne: '',
    textTwo: '',
    toHome: false
  }

  //
  handleSubmit = (e) => {
    e.preventDefault()

    console.log(this.props)

    const { textOne, textTwo } = this.state
    const { authedUser, dispatch } = this.props

    //console.log('id is', id)
    //console.log('authedUser is', authedUser)

    dispatch(handleAddQuestion(textOne, textTwo, authedUser))

    this.setState(() => ({
      textOne: '',
      textTwo: '',
      toHome: true
    }))
  }

  //
  handleTextOneChange = (e1) => {
    const textOne = e1.target.value

    this.setState(() => ({
      textOne
    }))

  }

  //
  handleTextTwoChange = (e2) => {
    const textTwo = e2.target.value

    this.setState(() => ({
      textTwo
    }))

  }

  //
  render() {

    //
    const { textOne, textTwo, toHome } = this.state

    //
    if(toHome === true) {
      return <Redirect to='/' />
    }

    const textOneLeft = 140 - textOne.length
    const textTwoLeft = 140 - textTwo.length

    return (
      <div>
        <h3 className='center'>Compose a New Question</h3>
        <h3 className='center'>Would You Rather...</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <div>
            <textarea
              placeholder="Enter Option One Here.."
              value={textOne}
              onChange={this.handleTextOneChange}
              className='textarea'
              maxLength={140}
            />
            {textOneLeft <= 100 && (
              <div className='question-length'>
                Characters Left:{textOneLeft}
              </div>
            )}
          </div>
          <div>
            <textarea
              placeholder="Enter Option Two Here.."
              value={textTwo}
              onChange={this.handleTextTwoChange}
              className='textarea'
              maxLength={140}
            />
            {textTwoLeft <= 100 && (
              <div className='question-length'>
                Characters Left:{textTwoLeft}
              </div>
            )}
            {textOne === textTwo && textOne !== '' && textTwo !== '' && (
              <div className='error-alert'>
                Text One and Two should be different!!
              </div>
            )}
          </div>
          <button
            className='btn'
            type='submit'
            disabled={textOne === '' || textTwo === '' || textOne === textTwo}>
              Submit
          </button>
        </form>
      </div>
    )//return
  }//render
}//class

//
function mapStateToProps({authedUser, redirRoute}){

  return {
    authedUser,
    redirRoute
  }
}

//
export default connect(mapStateToProps)(NewQuestion)

