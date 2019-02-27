import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

class Home extends Component {

  renderbuttons = () => {
    // if true all restaurants are loaded. else waiting for loading to finish
    if (this.props.loadedRestaurants) {
      return (
        <div className='home-main-container'>
          <div className='home-half-container'>
            <div className="home-info-wrapper">
              <NavLink to="/login">
                <center>
                  <button className='button'>Login</button>
                </center>
              </NavLink>
            </div>
          </div>
          <div className='home-half-container'>
            <NavLink to="/signup">
              <center>
                <button className='button'>Signup</button>
              </center>
            </NavLink>
          </div>
        </div>
      )
    } else {
      return (
        <div className='home-main-loading'>
          <h2>Loading Restaurants...</h2>
        </div>
        )
    }
  }

  render() {
    return (
      <div>
        <div className='app-welcome'>
          <div className='welcome-text'>
            <h1>Welcome to ResRanker</h1>
            <h3>Keep rank of everywhere You've Eaten</h3>
          </div>
          {this.renderbuttons()}
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadedRestaurants: state.loadedRestaurants
  }
}

export default connect(mapStateToProps)(Home)
