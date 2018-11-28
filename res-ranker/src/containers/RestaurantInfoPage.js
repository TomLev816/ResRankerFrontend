import React , {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { userPageToLoadAction } from '../store/actions/'
import SmallViewRestaurantComponent from '../components/SmallViewRestaurantComponent'


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
    .slice(startIndex, startIndex + 10)
    .map(restaurant => <SmallViewRestaurantComponent key={restaurant.id} restaurant={restaurant} />)
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
        <div>
          RestaurantInfoPage
          <button onClick={this.BacktoUserPage}>Back to User Page</button>
        </div>
        <div>
          <div className='search-multi-component' >
            <input name='search'className='search-bar' value={search} onChange={this.handleChange}/>
            {this.filterRestaurntsWithSearch()}
            <br></br>
            <button name='previous' onClick={this.changeRestaurants}> Get Previous Restaurants </button>
            <button name='next' onClick={this.changeRestaurants}> Get More Restaurants </button>
          </div>
          <div className='restaurantViewHalf'>
            
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
    userPageToLoad: state.userPageToLoad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantInfoPage)
