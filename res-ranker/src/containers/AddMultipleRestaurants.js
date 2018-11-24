import React, { Component } from 'react';
import {connect} from 'react-redux'
import SearchMultiRestaurants from '../components/SearchMultiRestaurants'
import HalfPageRankRestaurants from '../components/HalfPageRankRestaurants'
// import { Redirect} from 'react-router-dom'

class AddMultipleRestaurants extends Component {

  render() {
    return (
      <div className='add-multiple-restaurants-page'>
        <div className='add-multi-res-header'>
          <center>
            <h1>Welcome</h1>
            <h3>Add 5 restaurants that you've been to and rank them</h3>
          </center>
        </div>
        <div className='add-multi-res-container'>
          <div className='add-multi-box'>
            <center>Search for restaurants you've been to</center>
            <SearchMultiRestaurants />
          </div>
          <div className='add-multi-box'>
            <center>Rank the restaurants</center>
            <HalfPageRankRestaurants />
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

export default connect(mapStateToProps)(AddMultipleRestaurants)
