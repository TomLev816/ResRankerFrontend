import React from 'react';
import {connect} from 'react-redux'
import {viewOrMapAction} from '../store/actions/'

const renderStats = (restaurant, allUsers) => {

  let first = 0
  let top3 = 0
  let top10 = 0
  let bad = 0
  restaurant.user_restaurant_rankings.map(restaurant => {
    if (restaurant.ranking === 0) {
      return first += 1
    } else if (restaurant.ranking < 3) {
      return top3 += 1
    } else if (restaurant.ranking < 10) {
      return top10 += 1
    } else {
      return bad += 1
    }
  })


  first = first / allUsers.length
  first = Number((first).toFixed(2))
  first = first * 100

  top3 = top3 / allUsers.length
  top3 = Number((top3).toFixed(2))
  top3 = top3 * 100

  top10 = top10 / allUsers.length
  top10 = Number((top10).toFixed(2))
  top10 = top10 * 100



  return (
    <div>
      <h4>Ranked first by {first}% of users </h4>
      <h4>Ranked top 3 by {top3}% of users</h4>
      <h4>Ranked top 10 by {top10}% of users</h4>
    </div>
  )
} // end of function
// <h4>Ranked bad by {bad}% of users</h4>

const handleClick = (viewOrMapFunction) => {
  viewOrMapFunction("map");
}

function RestaurantShow({restaurantInfoLoad, allUsers, viewOrMapFunction}) {
  return (
    <div>
      <h1>Name: {restaurantInfoLoad.name}</h1>
      <img className='restaurant-view-img' src={restaurantInfoLoad.image_src} alt=""></img>
      <h2>Cusine: {restaurantInfoLoad.cuisine}</h2>
      {renderStats(restaurantInfoLoad, allUsers)}
      <button onClick={() => handleClick(viewOrMapFunction)}>view Map</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allRestaurants: state.allRestaurants,
    restaurantInfoLoad: state.restaurantInfoLoad,
    viewOrMap: state.viewOrMap,
    allUsers: state.allUsers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewOrMapFunction: viewOrMap => dispatch(viewOrMapAction(viewOrMap)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow)
