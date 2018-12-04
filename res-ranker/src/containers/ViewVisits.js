import React from 'react';
import { connect } from 'react-redux'
import { userLoggedInAction } from '../store/actions/'
// import Swiper from 'react-id-swiper';
//
//
// const params = {
//    slidesPerView: 3,
//    spaceBetween: 30,
//    pagination: {
//      el: '.swiper-pagination',
//      clickable: false,
//    }
//  };


function ViewVisits(props) {



const renderVisits = (props) => {
  const {allVisits, userLoggedIn, rankedRestaurants, allRestaurants} = props
  let userVisits = allVisits.filter(visit => visit.user_id === userLoggedIn.id)

return (
   userVisits.map(visit => {
    let restaurant = rankedRestaurants.find(restaurant => restaurant.restaurant_id === visit.restaurant_id)
    let restaurantInfo = allRestaurants.find(rest => rest.id === restaurant.restaurant_id)
    console.log(visit);
    return (
      <div className='slider-holder' >
        <img className="members-image" src={visit.image_url} alt="" ></img>
        <div className=''>
          <h1>{restaurantInfo.name}</h1>
          <h2>Meal: {visit.meal_eaten}</h2>
          <h3>Date of Visit: {visit.date.slice(5, 10)}-{visit.date.slice(0, 4) }</h3>
          <h3>Comment: {visit.comment}</h3>
        </div>
      </div>
    )
  })
  )
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
