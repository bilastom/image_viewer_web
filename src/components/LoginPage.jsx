import React, { Component } from "react"
import axios from 'axios';
import { Button, Container, TextField, Typography } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';
import { emailRegex } from '../shared/Variables'
import { Redirect } from "react-router-dom";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      redirect: false
    }
  }

  handleEmailChange = (e) => {
    const email = e.target.value
    const validation = emailRegex.test(email) ? { emailError: ''} : { emailError: 'Incorrect email'}
    this.setState({ email, ...validation })
  }

  handlePasswordChange = (e) => {
    const password = e.target.value
    this.setState({ password, passwordError: '' })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const url = `${process.env.REACT_APP_SERVER_URL}/users/sign_in.json`
    const { email, password} = this.state
    const params = { user: { email, password } }
    axios.post(url, params).then(res => {
      localStorage.setItem('jwt', res.headers.authorization)
      this.setState({ redirect: true })
    }).catch((error) => {
      if(error.response) {
        const message = error.response.data.error 
        this.setState({ emailError: message, passwordError: message }, () => console.log(this.state))
      } else {
        console.log(error.message)
      }
    })
  }

  performRedirect = () => {
    try {
      const path = this.props.location.state.from.pathname
      return(
        <Redirect to={{pathname: path, state: { loggedIn: true }}} />
      )
    } catch(error) {
      return(
        <Redirect to="/" />
      )
    }
  }

  render = () => {
    if (localStorage.getItem("jwt") && this.state.redirect) {
      return(
        this.performRedirect()
      )
    }

    const { classes } = this.props
    const { handleEmailChange, handleFormSubmit, handlePasswordChange, state } = this
    const { email, password, emailError, passwordError } = state

    return(
      <Container compoent="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleFormSubmit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}

export default  withStyles(styles)(LoginPage)
