import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux"

import LoginPage from './components/LoginPage'
import Home from './components/Home'
import AuthenticatedRoute from './routes/AuthenticatedRoute'
import TitleBar from './components/TitleBar'


class App extends Component {
  render = () => {
    return(
      <div style={{flexGrow: 1}}>
        <Router>
          <TitleBar />
          <Switch>
            <AuthenticatedRoute exact path="/" component={Home} authenticated={this.props.authenticated} />
            <Route path="/login" render={props => <LoginPage {...props} />} />
            <Route path="/logout"/>
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { authenticated } = state.authentication
  return { authenticated }
}

export default connect(mapStateToProps)(App)
