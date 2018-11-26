import React from 'react';
import {connect} from 'react-redux'
import { userLoggedInAction } from '../store/actions/'
// import { Redirect} from 'react-router-dom'

const handleClick = (props) => {
  let ranking = props.userLoggedIn.user_restaurant_rankings
  if (!ranking.includes(props.restaurant)) {
    fetch('http://localhost:4000/api/v1/user_restaurant_rankings', {
      method: 'POST',
      body: JSON.stringify({
        restaurant_id: props.restaurant.id,
        user_id: props.userLoggedIn.id,
        ranking: props.userLoggedIn.user_restaurant_rankings.length + 1,
        visits: []
      }),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(resJson => fetch(`http://localhost:4000/api/v1/users/${props.userLoggedIn.id}`)
      .then(res => res.json())
      .then(user => props.userLoggedInFunction(user))
  )
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedInFunction: user => dispatch(userLoggedInAction(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallRestaurantComponent)
