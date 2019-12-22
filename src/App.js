import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

import LoginPage from './components/LoginPage'
import Home from './components/Home'

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
              Image Viewer
            </Typography>
            <Button component={Link} to="/login" color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      
        <Route exact path="/" component={Home} />
        <Route path="/login" render={props => <LoginPage {...props} />} />
      </Router>
    </div>
  )
}
