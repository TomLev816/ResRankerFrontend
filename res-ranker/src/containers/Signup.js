import React, { Component } from 'react';
import {connect} from 'react-redux'
import { userLoggedInAction, addNewUser } from '../store/actions/'
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
          password_digest: password,
          visit_count: 0,
          image_src: image_src,
          restaurants_ranked: 0,
          user_restaurant_rankings: []
        }),
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(res => res.json())
        .then(user => {
          this.props.userLoggedInFunction(user)
          this.props.addNewUserFunction(user)
          this.setState({
            redirect: true,
          })
        }

        )
    } else {
      console.log('form NOT FIlled out yo');
    }
  }

  render() {
    const {firstName, lastName, username, password, image_src} = this.state
    return (
      <div className='signup-page-pic'>
        <div className='signup-page'>
          {this.state.redirect ? <Redirect to='/add-restaurants' /> : null}
          <div className='welcome-signup'>
            Welcome to ResRanker
          </div>
          <div className='signup-form'>
            <form onSubmit={this.handleSubmit}>
              <input name='firstName' placeholder='  Name'  value={firstName} onChange={this.handleChange} />
              <br></br>

              <input name='lastName'  placeholder='  Email' value={lastName} onChange={this.handleChange} />
              <br></br>

              <input name='username'  placeholder='  Username' value={username} onChange={this.handleChange}/>
              <br></br>

              <input name='password'  placeholder='  Password' value={password} onChange={this.handleChange} />
              <br></br>

              <input name='image_src' placeholder='  Image'  value={image_src} onChange={this.handleChange} />
              <br></br>
              <div className='submit-signup'>
                <input type='submit'/>
              </div>
            </form>
          </div>
        </div>
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
    addNewUserFunction: user => dispatch(addNewUser(user)),
    userLoggedInFunction: user => dispatch(userLoggedInAction(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
