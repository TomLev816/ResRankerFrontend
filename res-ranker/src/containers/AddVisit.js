import React, { Component } from 'react';
import { connect } from 'react-redux'
// import {NavLink} from 'react-router-dom'

import EditRanking from '../components/EditRanking'



class AddVisit extends Component {

  handleClick = (event) => {
    console.log('yoyoy');
  }

  render (){
    console.log(this.props);
    return (
      <div className='user-show-page'>
        <div className='user-side-of-page'>
          <div className='user-pic'>
            <img src={this.props.userLoggedIn.image_src} alt=''></img>
          </div>
          <div className='user-info'>
            <h1>Restaurant Name: {this.props.userLoggedIn.username}</h1>
            <h2>Cusine: {this.props.userLoggedIn.first}</h2>
            <h3>Address: {this.props.userLoggedIn.restaurants_visited} </h3>
          </div>
          <div className='add-buttons'>
            <button name='addVisit' onClick={this.handleClick} >Add New Visit</button>
            <br></br>
            <button name='renderRestaurants' onClick={this.handleClick} >View Your Restaurants</button>
              <br></br>
            <button name='editRanking' onClick={this.handleClick} >Edit Your Rankings</button>
          </div>
        </div>
        <div className='restaurant-side-of-page'>
          <h1>Your Visit</h1>
          <EditRanking />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    rankedRestaurants: state.rankedRestaurants
  }
}

export default connect(mapStateToProps)(AddVisit)
