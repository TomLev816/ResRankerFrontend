import React from 'react';
import { connect } from 'react-redux'
import { userLoggedInAction } from '../store/actions/'




function ViewVisits(props) {


const renderVisits = (props) => {
  const {allVisits, userLoggedIn, rankedRestaurants, allRestaurants} = props
  let userVisits = allVisits.filter(visit => visit.user_id === userLoggedIn.id)

  return userVisits.map(visit => {
    let restaurant = rankedRestaurants.find(restaurant => restaurant.restaurant_id === visit.restaurant_id)
    let restaurantInfo = allRestaurants.find(rest => rest.id === restaurant.restaurant_id)
    return (
      <div className='user-show-restaurant-visit' >
        <div className='photo-of-restaurant'>
          <img src={visit.image_url} alt="" ></img>
        </div>
        <div className='info-on-visit'>
          <h1>{restaurantInfo.name}</h1>
          <h3>Date of Visit: {visit.date.slice(0, 10)}</h3>
          <h3>Comment: {visit.comment}</h3>
        </div>
      </div>
    )
  })
}

  return (
    <div className='visits-page'>
      {renderVisits(props)}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    allVisits: state.allVisits,
    allRestaurants: state.allRestaurants,
    rankedRestaurants: state.rankedRestaurants,
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedInFunction: user => dispatch(userLoggedInAction(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewVisits)
