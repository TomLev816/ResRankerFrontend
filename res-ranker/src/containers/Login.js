
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
      let rankedRes = []
      user.user_restaurant_rankings.sort(function(a, b){
        return a.ranking-b.ranking
      })
      console.log(user.user_restaurant_rankings);
      user.user_restaurant_rankings.map(urr => rankedRes.push(urr))
      this.props.newRankedRestaurantFunction(rankedRes)
      return <Redirect to='/user-page' />
      }
    else {
      alert('Enter Correct Username and Password')
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
