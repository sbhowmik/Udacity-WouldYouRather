import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import QuestionBoard from './QuestionBoard'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Logout from './Logout'
import Login from './Login'
import QuestionHandler from './QuestionHandler'
import PageNotFoundHandler from './PageNotFoundHandler';
import '../index.css';

//
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

    const authedUser = this.props.authedUser

    //when logged
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />   
            <Switch>    
              <Route path='/' exact component={QuestionBoard} />
              <PrivateRoute path='/add' component={NewQuestion} authedUser={authedUser} />
              <PrivateRoute path='/leaderboard' component={LeaderBoard} authedUser={authedUser} />
              <Route path='/login' component={withRouter(Login)} />
              <Route path='/logout' component={Logout} /> 
              <Route path='/questions/:id' component={QuestionHandler} />
              <Route path='/pagenotfound' component={PageNotFoundHandler} />
              <Route path='/*' component={PageNotFoundHandler} />
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