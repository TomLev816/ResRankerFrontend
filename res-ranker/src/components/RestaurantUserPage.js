import React from 'react';
import { connect } from 'react-redux'
import { restaurnatInfoLoadAction } from '../store/actions/'
import {NavLink} from 'react-router-dom'

// props.visitRestaurantFunction(props.restaurant)

let handleEditVisit = (props, restaurant) => {
  let {user} = props
  // console.log(restaurant.id);
  // console.log(user);
  let toEdit = user.user_restaurant_rankings.filter(res => res.restaurant_id === restaurant.id)
  // console.log(toEdit);
  //the user_restaurant_rank = toEdit.id
}


function RestaurantUserPage(props) {
  // console.log(props);
  let restaurant = props.allRestaurants.find(restaurant => restaurant.id === props.restaurantId)
  // console.log(restaurant);

  return (
      <div className='user-show-restaurant-visit' >
        <div className='rank-of-restaurant'>
          <h1>{props.rank}.</h1>
        </div>
        <div className='photo-of-restaurant'>
          <img src={restaurant.image_src} alt="" ></img>
          <button onClick={() => handleEditVisit(props, restaurant)}>Edit Visit</button>
        </div>
        <div className='info-on-visit'>
          <h1>{restaurant.name}</h1>
          <h3>Located: {restaurant.address}</h3>
          <h3>Cusine: {restaurant.cuisine}</h3>
        </div>
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allRestaurants: state.allRestaurants,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    restaurnatInfoLoadFunction: restaurant => dispatch(restaurnatInfoLoadAction(restaurant))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantUserPage)
