import React from 'react';
import {connect} from 'react-redux'
import {rankedRestaurantsAction, visitRestaurantsAction, userPageToLoadAction, creatNewUserRestaurantRank, restaurnatInfoLoadAction } from '../store/actions/'
// import { Redirect, NavLink} from 'react-router-dom'
// import { browserHistory } from 'react-router'


const handleClick = (props) => {
  let exist = props.rankedRestaurants.filter(rest => rest.restaurant_id === props.restaurant.id)
  if (exist.length === 0) {
    props.creatNewUserRestaurantRank(props.restaurant, props.userLoggedIn, props.rankedRestaurants)
    props.userPageToLoadFunction('editRanking')
  }
}

const handleViewRestaurant = (props) => {
  console.log(props.restaurantInfoLoad);
  console.log(props.restaurantInfoLoadFunction);
  props.restaurantInfoLoadFunction(!props.restaurantInfoLoad)
}

function SmallRestaurantComponent(props) {
  return (
    <div className='small-restaurant-component'>
      <div className='small-restaurant-component-clickable' onClick={() => handleClick(props)}>
        <div className='small-restaurant-component-img'>
          <img src={props.restaurant.image_src} alt="" />
        </div>
        <div className='small-restaurant-component-info'>
          <h2>{props.restaurant.name}</h2>
        </div>
      </div>
      <button onClick={() => handleViewRestaurant(props)}>View Restaurant Info</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    rankedRestaurants: state.rankedRestaurants,
    restaurantInfoLoad: state.restaurantInfoLoad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newRankedRestaurantFunction: rankedRestaurants => dispatch(rankedRestaurantsAction(rankedRestaurants)),
    visitRestaurantFunction: visitRestaurant => dispatch(visitRestaurantsAction(visitRestaurant)),
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad)),
    restaurantInfoLoadFunction: infoLoad => dispatch(restaurnatInfoLoadAction(infoLoad)),
    creatNewUserRestaurantRank: (restaurant, userLoggedIn, rankedRestaurants) => dispatch(creatNewUserRestaurantRank(restaurant, userLoggedIn, rankedRestaurants)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallRestaurantComponent)
