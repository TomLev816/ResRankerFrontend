import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { userPageToLoadAction } from '../store/actions/'

const BacktoUserPage = (props) => {
  props.userPageToLoadFunction('renderRestaurants')
}

function RestaurantInfoPage(props) {
  console.log(props);
  return (
    <div>
        {props.userPageToLoad !== 'searchRestaurants' ?  <Redirect to={'/user-page'} /> : null}
      <div>
        RestaurantInfoPage
        <button onClick={()=>BacktoUserPage(props) }>Back to User Page</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allRestaurants: state.allRestaurants,
    restaurantInfoLoad: state.restaurantInfoLoad,
    userPageToLoad: state.userPageToLoad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantInfoPage)
