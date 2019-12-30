import React, { Component } from "react"
import { connect } from "react-redux"

import { Button, Container, TextField, Typography } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';
import { emailRegex } from '../constants/utils'
import { loginUser } from "../actions"

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

    const { email, password} = this.state

    if(email && password) this.props.loginUser(email, password, this.props.history)
  }

  render = () => {

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

const mapDispatchToProps = { loginUser }

export default connect(null, mapDispatchToProps)(withStyles(styles)(LoginPage))
