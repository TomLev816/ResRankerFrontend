import React, { Component } from 'react';
import { connect } from 'react-redux'
import RestaurantUserPage from '../components/RestaurantUserPage.js'
// import {NavLink} from 'react-router-dom'
import AddVisit from './AddVisit'


class UserShowPage extends Component {
  state = {
    pageToLoad: 'renderRestaurants'
  }

  renderRestaurants = () => {
    console.log(this.props);
    // console.log(this.props.userLoggedIn.user_restaurant_rankings[0].restaurant.name) Obama
    console.log(this.props.userLoggedIn);
    // let ranked = this.props.userLoggedIn.user_restaurant_rankings.sort((a, b) => {
    let ranked = this.props.userLoggedIn.user_restaurant_rankings.sort((a, b) => {
      return a.ranking-b.ranking
    })
    console.log(ranked);
    if (ranked) {
      let rank = 0
      return ranked.map(rest => {
        rank += 1
        return <RestaurantUserPage rank={rank} key={rest.id} restaurant={rest}/>
      })
    }
  }

  handleClick = (event) => {
    console.log(event.target.name);
    this.setState({
      pageToLoad: event.target.name,
    });
  }

  render (){
    console.log(this.props);
    return (
      <div className='user-show-page'>
        <div className='user-side-of-page'>
          <div className='user-pic'>
            <img src={this.props.userLoggedIn.image_src} alt=''></img>
          </div>
          <div className='user-info'>
            <h1>Username: {this.props.userLoggedIn.username}</h1>
            <h2>Name: {this.props.userLoggedIn.first}</h2>
            <h3>Restaurants Visited: {this.props.userLoggedIn.restaurants_visited} </h3>
          </div>
          <div className='add-buttons'>
            <button name='addVisit' onClick={this.handleClick} >Add New Visit</button>
            <br></br>
            <button name='renderRestaurants' onClick={this.handleClick} >View Your Restaurants</button>
          </div>
        </div>
        <div className='restaurant-side-of-page'>
          <h1>Restaurants You've Visited</h1>
          {this.state.pageToLoad === 'renderRestaurants' ? this.renderRestaurants() : null}
          {this.state.pageToLoad === 'addVisit' ? <AddVisit /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    rankedRestaurants: state.rankedRestaurants
  }
}

export default connect(mapStateToProps)(UserShowPage)
