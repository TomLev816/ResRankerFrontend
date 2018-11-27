import React from 'react';
import {connect} from 'react-redux'
import { userLoggedInAction, rankedRestaurantsAction } from '../store/actions/'
// import { Redirect} from 'react-router-dom'

const handleClick = (props) => {
  let rankedRes = [...props.rankedRestaurants]
  console.log(props.restaurant);
  // rankedRes.filter(rest => rest.name !== props.restaurant.name)
  rankedRes.push(props.restaurant)
  props.newRankedRestaurantFunction(rankedRes)
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedInFunction: user => dispatch(userLoggedInAction(user)),
    newRankedRestaurantFunction: rankedRestaurants => dispatch(rankedRestaurantsAction(rankedRestaurants))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallRestaurantComponent)
