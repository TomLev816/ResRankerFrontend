import React from 'react';
import {connect} from 'react-redux'
import {rankedRestaurantsAction, restaurnatInfoLoadAction, userPageToLoadAction, viewOrMapAction} from '../store/actions/'
// import RestaurantInfoPage from './RestaurantInfoPage'
// import { Redirect} from 'react-router-dom'
// import { browserHistory } from 'react-router'


const handleClick = (props) => {
  console.log(props)
  props.viewRestaurantInfoFunction(props.restaurant)
  props.viewOrMapFunction('view')
}


function SmallViewRestaurantComponent(props) {
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
    viewRestaurantInfoFunction: viewRestaurant => dispatch(restaurnatInfoLoadAction(viewRestaurant)),
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad)),
    viewOrMapFunction: viewOrMap => dispatch(viewOrMapAction(viewOrMap)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallViewRestaurantComponent)
