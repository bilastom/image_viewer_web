import React, { Component } from "react"
import { Button } from "@material-ui/core"
import axios from 'axios';
import { Redirect } from "react-router-dom";

const url = `${process.env.REACT_APP_SERVER_URL}/users/sign_out.json`

export default class Logout extends Component {
  constructor(props){
    super(props)
    this.state = { 
      redirect: false
    }
  }

  handleLogout = (e) => {
    e.preventDefault()
    const headers = { 'Authorization': localStorage.getItem('jwt') }
    axios.delete(url, headers).then(res => {
      localStorage.removeItem('jwt')
      this.setState({ redirect: true })
    })
  }

  render = () => {
    if(this.state.redirect) {
      return(
        <Redirect to='/login' />
      )
    }

    return(
      <Button onClick={this.handleLogout} color="inherit">Logout</Button>
    )
  }
}
