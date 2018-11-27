import React from 'react';
import {connect} from 'react-redux'
import { userLoggedInAction, rankedRestaurantsAction, visitRestaurantsAction } from '../store/actions/'
import { Redirect} from 'react-router-dom'
// import { browserHistory } from 'react-router'


const handleClick = (props) => {
  let rankedRes = [...props.rankedRestaurants]

  // check to see if it already exist in ranking
  let exist = props.rankedRestaurants.filter(rest => rest.name === props.restaurant.name)
  props.visitRestaurantFunction(props.restaurant)
  if (exist.length === 0) {
    rankedRes.push(props.restaurant)
    props.newRankedRestaurantFunction(rankedRes)
    fetch('http://localhost:4000/api/v1/user_restaurant_rankings', {
      method: 'POST',
      body: JSON.stringify({
        "restaurant_id": props.restaurant.id,
        "user_id": props.userLoggedIn.id,
        "ranking": props.rankedRestaurants.length,
        "visits": [],
      }),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(resJson =>  console.log(resJson))
  }
  console.log('here');
  return <Redirect to='/add-visit'/>
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
    newRankedRestaurantFunction: rankedRestaurants => dispatch(rankedRestaurantsAction(rankedRestaurants)),
    visitRestaurantFunction: visitRestaurant => dispatch(visitRestaurantsAction(visitRestaurant))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallRestaurantComponent)
