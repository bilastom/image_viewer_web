import React, { Component } from "react"
import {
  Link
} from "react-router-dom";
import { connect } from "react-redux"

import { AppBar, Button, Toolbar } from '@material-ui/core'
import Logout from './Logout'

const styles = {
  link: {
    flexGrow: 1, textDecoration: 'none', color: 'white'
  }
}

class TitleBar extends Component {
  render = () => {
    const { authenticated } = this.props
    return(
      <AppBar position="static">
        <Toolbar>
          <Link to='/' variant="h6" style={styles.link}>Image Viewer</Link>
          { authenticated ? <Logout /> : <Button component={Link} to="/login" color="inherit">Login</Button> }
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
