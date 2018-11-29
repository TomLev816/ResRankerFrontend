import React from 'react';
import { connect } from 'react-redux'
import MapShow from '../components/Map/MapShow'



const UserMapPage = (props) => {
  let restaurants = []
  restaurants = props.rankedRestaurants.map(urr => {
    return props.allRestaurants.find(rest => rest.id === urr.restaurant_id)
  })

  console.log(restaurants);



  return (
    <div className='user-map-page-container'>
      <div className='top-of-map-page'>
        <center><h3>Restaurants You've Been To!</h3></center>
      </div>
      <div className='user-map-container'>
        <MapShow restaurants={restaurants} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rankedRestaurants: state.rankedRestaurants,
    userMapToLoad: state.userMapToLoad,
    allRestaurants: state.allRestaurants
  }
}


export default connect(mapStateToProps)(UserMapPage)
