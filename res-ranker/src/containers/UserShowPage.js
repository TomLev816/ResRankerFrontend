import React from 'react';
import { connect } from 'react-redux'
import RestaurantUserPage from '../components/RestaurantUserPage.js'

const renderRestaurants = (props) => {
  console.log(props.userLoggedIn.restaurants);
  if (props.userLoggedIn.restaurants) {
    let rank = 0
    return props.userLoggedIn.restaurants.map(rest => {
      rank += 1
      return <RestaurantUserPage rank={rank} key={rest.id} restaurant={rest}/>
    })
  }
}


function UserShowPage(props) {

  return (
    <div className='user-show-page'>
      <div className='user-side-of-page'>
        <div className='user-pic'>
          <img src={props.userLoggedIn.image_src} alt=''></img>
        </div>
        <div className='user-info'>
          <h1>Username: {props.userLoggedIn.username}</h1>
          <h2>Name: {props.userLoggedIn.first}</h2>
          <h3>Restaurants Visited: {props.userLoggedIn.restaurants_visited} </h3>
        </div>
        <div className='add-buttons'>
          <button>Add New Visit</button>
        </div>
      </div>
      <div className='restaurant-side-of-page'>
        <h1>Restaurants You've Visited</h1>
        {renderRestaurants(props)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn
  }
}

export default connect(mapStateToProps)(UserShowPage)
