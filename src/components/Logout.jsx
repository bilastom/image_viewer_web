import React, { Component } from "react"
import { connect } from "react-redux"
import { Button } from "@material-ui/core"
import { logoutUser } from "../actions"

class Logout extends Component {
  handleLogout = (e) => {
    e.preventDefault()

    this.props.logoutUser()
  }

  render = () => {
    return(
      <Button onClick={this.handleLogout} color="inherit">Logout</Button>
    )
  }
}

const mapDispatchToProps = { logoutUser }

export default connect(null, mapDispatchToProps)(Logout)
