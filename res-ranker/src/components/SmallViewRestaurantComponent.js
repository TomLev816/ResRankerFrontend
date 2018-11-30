import React, {Component} from 'react';
import {connect} from 'react-redux'
import {rankedRestaurantsAction, visitRestaurantsAction, userPageToLoadAction, viewOrMapAction, creatNewUserRestaurantRank} from '../store/actions/'
// import RestaurantInfoPage from './RestaurantInfoPage'
import { Redirect} from 'react-router-dom'
// import { browserHistory } from 'react-router'

class SmallViewRestaurantComponent extends Component {

  state = {
    redirect: false
  }

handleClick = () => {
  const {rankedRestaurants, restaurant, userLoggedIn } = this.props
  let exist = rankedRestaurants.filter(rest => rest.restaurant_id === restaurant.id)
  this.props.visitRestaurantFunction(restaurant)
  if (exist.length === 0) {
    this.props.creatNewUserRestaurantRank(restaurant, userLoggedIn, rankedRestaurants)
  }
  this.setState({
    redirect: true,
  });
}


  render() {
    let {restaurant} = this.props
    return (

        <div className='small-restaurant-component' onClick={this.handleClick}>
          {this.state.redirect ? <Redirect to={"/add-new-visit"} /> : null}
          <div className='small-restaurant-component-img'>
            <img src={restaurant.image_src} alt="" />
          </div>
          <div className='small-restaurant-component-info'>
            <h2>{restaurant.name}</h2>
          </div>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    rankedRestaurants: state.rankedRestaurants,
    restaurantInfoLoad: state.restaurantInfoLoad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newRankedRestaurantFunction: rankedRestaurants => dispatch(rankedRestaurantsAction(rankedRestaurants)),
    visitRestaurantFunction: viewRestaurant => dispatch(visitRestaurantsAction(viewRestaurant)),
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad)),
    viewOrMapFunction: viewOrMap => dispatch(viewOrMapAction(viewOrMap)),
    creatNewUserRestaurantRank: (restaurant, userLoggedIn, rankedRestaurants) => dispatch(creatNewUserRestaurantRank(restaurant, userLoggedIn, rankedRestaurants)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallViewRestaurantComponent)
