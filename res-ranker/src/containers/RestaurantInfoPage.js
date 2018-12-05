import React , {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { userPageToLoadAction } from '../store/actions/'
import SmallViewRestaurantComponent from '../components/SmallViewRestaurantComponent'
import RestaurantShow from '../components/RestaurantShow'
import MapShow from '../components/Map/MapShow'


class RestaurantInfoPage extends Component {
  state = {
    search: '',
    startIndex: 0,
  }

BacktoUserPage = () => {
  this.props.userPageToLoadFunction('renderRestaurants')
}

filterRestaurntsWithSearch = () => {
  const {search, startIndex} = this.state
  return this.props.allRestaurants
    .filter(restaurant => restaurant.name.toLowerCase().includes(search.toLowerCase()))
    .slice(startIndex, startIndex + 5)
    .map(restaurant => <SmallViewRestaurantComponent key={restaurant.id} restaurant={restaurant} />)
}

FilterRestaurntsForMap = () => {
  const {search, startIndex} = this.state
  let restShowing = this.props.allRestaurants
    .filter(restaurant => restaurant.name.toLowerCase().includes(search.toLowerCase()))
    .slice(startIndex, startIndex + 5)
  console.log(restShowing);
  return this.props.viewOrMap === 'map' ? <MapShow restaurants={restShowing} /> : null
}

changeRestaurants = (event) => {
  const {startIndex} = this.state
  if (event.target.name === 'next') {
    this.setState({
      startIndex: startIndex + 5,
    });
  } else if (event.target.name === 'previous' && startIndex > 4) {
    this.setState({
      startIndex: startIndex - 5,
    })
  }
}

handleChange = (event) => {
  if (!event.target.value) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  } else {
    this.setState({
      [event.target.name]: event.target.value ,
      startIndex: 0,
    });
  }
} // end handle change



  render() {
    const {search} = this.state
    return (
      <div>
        {this.props.userPageToLoad !== 'searchRestaurants' ?  <Redirect to={'/user-page'} /> : null}
        <div className='restaurant-info-view-page'>
          <div className='search-multi-component-third' >
            <div className='mapButtons'>
              <button onClick={this.BacktoUserPage}>Back to User Page</button>
            </div>
            <div className='search-bar'>
            <input name='search' value={search} onChange={this.handleChange} placeholder=" Search Restaurants"/>
            </div>
            <br></br>
            <div className='mapButtons'>
              <button name='previous' onClick={this.changeRestaurants}> Previous</button>
              <button name='next' onClick={this.changeRestaurants}>Next</button>
            </div>
            {this.filterRestaurntsWithSearch()}
            <br></br>
          </div>
          <div className='restaurantViewTwoThirds'>
            {this.props.viewOrMap === 'view' ? <RestaurantShow /> : null }
            {this.FilterRestaurntsForMap()}
          </div>
        </div>
      </div>
    );
  }
}


















const mapStateToProps = (state) => {
  return {
    allRestaurants: state.allRestaurants,
    restaurantInfoLoad: state.restaurantInfoLoad,
    userPageToLoad: state.userPageToLoad,
    viewOrMap: state.viewOrMap,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantInfoPage)
