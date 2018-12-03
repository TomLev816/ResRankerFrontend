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
    console.log(restaurant);
    console.log(visit);
    console.log(restaurantInfo);
    return (
      <div key={visit.id}>
        {restaurantInfo.name}
        {visit.date.slice(0, 10)}
        {visit.comment}
        <img src={visit.image_url} alt=''></img>
      </div>
    )
  })
}

  return (
    <div className='visits-page'>
      Recent Restaurant Vists
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
