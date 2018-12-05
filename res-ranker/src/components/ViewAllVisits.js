import React from 'react';
import { connect } from 'react-redux'


function ViewAllVisits(props) {
  const {allVisits, allUsers, allRestaurants} = props

    console.log(allVisits, allUsers, allRestaurants);
    const userVisitsToIterate = allVisits.slice(0).reverse()
    return userVisitsToIterate.map(visit => {
      let user = allUsers.find(user => user.id === visit.user_id)
      let restaurant = allRestaurants.find(restaurant => restaurant.id === visit.restaurant_id)
      return (
        <div key={visit.id}>
          <center>
            <div className='slider-holder' >
              <h1>{restaurant.name}</h1>
              <h3>User: {user.username}</h3>
              <img className="members-image" src={visit.image_url} alt="" ></img>
              <div className=''>
                <div className='visit-info'>
                  <h2>Meal: {visit.meal_eaten}</h2>
                  <h3>Date of Visit: {visit.date.slice(5, 10)}-{visit.date.slice(0, 4) }</h3>
                  <h3>Comment: {visit.comment}</h3>
                </div>
              </div>
            </div>
          </center>
        </div>
      );
    })

}



const mapStateToProps = (state) => {
  return {
    allVisits: state.allVisits,
    allUsers: state.allUsers,
    allRestaurants: state.allRestaurants
  }
}

export default connect(mapStateToProps)(ViewAllVisits)
