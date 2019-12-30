import React, { Component } from "react"
import {
  Link
} from "react-router-dom";
import { connect } from "react-redux"

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import Logout from './Logout'


class TitleBar extends Component {
  render = () => {
    return(
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} >
            Simple Image Viewer
          </Typography>
          { this.props.authenticated ? <Logout /> : <Button component={Link} to="/login" color="inherit">Login</Button> }
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = (state) => {
  const { authenticated } = state.authentication

  return { authenticated }
}

export default connect(mapStateToProps)(TitleBar)
