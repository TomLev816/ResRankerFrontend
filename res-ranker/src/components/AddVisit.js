import React from 'react';
import {connect} from 'react-redux';
import SearchMultiRestaurants from '../components/SearchMultiRestaurants'

function AddVisit(props) {
  return (
    <div>
      Add a Visit
      <SearchMultiRestaurants />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    allRestaurants: state.allRestaurants,
  }
}

export default connect(mapStateToProps)(AddVisit)
