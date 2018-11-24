import React, { Component } from 'react';
import {connect} from 'react-redux'
import { userLoggedInAction } from '../store/actions/'
import { Redirect} from 'react-router-dom'


class Signup extends Component {

  state = {
    redirect: false,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    image_src: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {firstName, lastName, username, password, image_src} = this.state
    if (firstName && lastName && username && password && image_src) {
      fetch('http://localhost:4000/api/v1/users', {
        method: 'POST',
        body: JSON.stringify({
          first: firstName,
          last: lastName,
          username: username,
          restaurants_visited: 0,
          image_src: image_src,
          total_restaurants_ranked: 0
        }),
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(res => res.json())
        .then(user => this.props.userLoggedInFunction(user),
          this.setState({
            redirect: true,
          })
        )
    } else {
      console.log('form NOT FIlled out yo fill it out son');
    }
  }

  render() {
    const {firstName, lastName, username, password, image_src} = this.state
    return (
      <div className='signup-page'>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name
          </label>
          <input name='firstName' value={firstName} onChange={this.handleChange} />
          <br></br>
          <label>
            Last Name
          </label>
          <input name='lastName' value={lastName} onChange={this.handleChange} />
          <br></br>
          <label>
            Username
          </label>
          <input name='username' value={username} onChange={this.handleChange}/>
          <br></br>
          <label>
            Password
          </label>
          <input name='password' value={password} onChange={this.handleChange} />
          <br></br>
          <label>
            Image Source
          </label>
          <input name='image_src' value={image_src} onChange={this.handleChange} />
          <br></br>
          <input type='submit'/>
        </form>
        {this.state.redirect ? <Redirect to='/user-page' /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedInFunction: user => dispatch(userLoggedInAction(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
