import React from 'react';
import {connect} from 'react-redux'
import {rankedRestaurantsAction, visitRestaurantsAction, userPageToLoadAction, creatNewUserRestaurantRank } from '../store/actions/'
// import RestaurantInfoPage from './RestaurantInfoPage'
// import { Redirect} from 'react-router-dom'
// import { browserHistory } from 'react-router'


const handleClick = (props) => {
  let exist = props.rankedRestaurants.filter(rest => rest.restaurant_id === props.restaurant.id)
  if (exist.length === 0) {
    props.creatNewUserRestaurantRank(props.restaurant, props.userLoggedIn, props.rankedRestaurants)
    props.userPageToLoadFunction('editRanking')
  }
}


function SmallRestaurantComponent(props) {
  return (

      <div className='small-restaurant-component' onClick={() => handleClick(props)}>
        <div className='small-restaurant-component-img'>
          <img src={props.restaurant.image_src} alt="" />
        </div>
        <div className='small-restaurant-component-info'>
          <h2>{props.restaurant.name}</h2>
        </div>
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
    creatNewUserRestaurantRank: (restaurant, userLoggedIn, rankedRestaurants) => dispatch(creatNewUserRestaurantRank(restaurant, userLoggedIn, rankedRestaurants)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallRestaurantComponent)
