import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import LoginPage from './components/LoginPage'
import Home from './components/Home'
import AuthenticatedRoute from './routes/AuthenticatedRoute'
import Logout from './components/Logout'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1
  },
  link: {
    textDecoration: 'none'
  }
}));


export default function App() {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} >
              Simple Image Viewer
            </Typography>
            {localStorage.getItem('jwt') ? <Logout /> : <Button component={Link} to="/login" color="inherit">Login</Button>}
          </Toolbar>
        </AppBar>
        <Switch>
          <AuthenticatedRoute exact path="/" component={Home} />
          <Route path="/login" render={props => <LoginPage {...props} />} />
          <Route path="/logout" />
        </Switch>
      </Router>
    </div>
  )
}
