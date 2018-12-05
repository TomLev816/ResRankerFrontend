import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'


export default class Home extends Component {

  render() {
    return (
      <div>
        <div className='app-welcome'>
          <div className='welcome-text'>
            <h1>Welcome to ResRanker</h1>
            <h3>Keep rank of everywhere You've Eaten</h3>
          </div>
        </div>
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
      </div>
    );
  }
}
