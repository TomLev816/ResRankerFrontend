import React from 'react';
import { connect } from 'react-redux'

function Restaurants(props) {
  return (
    <div>
      {props.allRestaurants.map(rest => console.log(rest.name))}
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    allRestaurants: state.allRestaurants
  }
}

export default connect(mapStateToProps)(Restaurants)
