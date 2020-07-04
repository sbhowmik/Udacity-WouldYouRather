import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import '../index.css';
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import QuestionBoard from './QuestionBoard'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import PageNotFound from './PageNotFound'
import Logout from './Logout'
import Login from './Login'
import QuestionHandler from './QuestionHandler'

class App extends Component {

  //
  state = {
    dataLoaded: false
  }

  //
  componentDidMount () {
    let dataLoaded = this.state.dataLoaded
    if (dataLoaded === false) {
      this.props.dispatch(handleInitialData())
      .then(() => {
        this.setState(() => ({
          dataLoaded: true
        }))
      })
    }
  }

  //
  render() {

    //when logged
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />   
            <Switch>    
              <Route path='/' exact component={QuestionBoard} />
              <Route path='/add' component={NewQuestion} />
              <Route path='/leaderboard' component={LeaderBoard} />
              <Route path='/login' component={withRouter(Login)} />
              <Route path='/logout' component={Logout} /> 
              <Route path='/questions/:id' component={QuestionHandler} />
              <Route path='/*' component={PageNotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }


}//class App

//
function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

//
export default connect(mapStateToProps)(App) //mapStateToProps

