
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { userLoggedInAction } from '../store/actions/'
import { rankedRestaurantsAction } from '../store/actions/'

import { Redirect} from 'react-router-dom'

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let user = this.props.allUsers.filter(user => user.username === this.state.username)[0]
    if (user) {
      this.props.userLoggedInFunction(user);
      this.props.newRankedRestaurantFunction(user.user_restaurant_rankings)
      return <Redirect to='/user-page' />
      }
    else {
      alert('Enter Correct UserName')
    }
  }

  render() {
    // console.log(this.props.userLoggedIn);
    if (this.props.userLoggedIn) {
     return <Redirect to='/user-page' />
    }
    const {username, password} = this.state
    return (
      <div className='login-page-contianer'>
        <div className='app-name'>
          <h1>ResRanker</h1>
        </div>
        <form>
          <div className='login-form'>
            <div className='half-login'>
              <center>
                <input
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={this.handleChange}>
                </input>
              </center>
            </div>
            <div className='half-login'>
              <center>
                <input
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={this.handleChange}>
                </input>
              </center>
            </div>
          </div>
          <div className='login-submit'>
            <center>
              <button onClick={this.handleSubmit} >Submit</button>
            </center>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
    userLoggedIn: state.userLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedInFunction: user => dispatch(userLoggedInAction(user)),
    newRankedRestaurantFunction: rankedRestaurants => dispatch(rankedRestaurantsAction(rankedRestaurants))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
