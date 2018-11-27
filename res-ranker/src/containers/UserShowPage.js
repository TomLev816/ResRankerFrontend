import React, { Component } from 'react';
import { connect } from 'react-redux'
import RestaurantUserPage from '../components/RestaurantUserPage.js'
// import {NavLink} from 'react-router-dom'
import AddVisit from '../components/AddVisit'
import EditRanking from '../components/EditRanking'
import { userPageToLoadAction } from '../store/actions/'



class UserShowPage extends Component {

  renderRestaurants = () => {
    if (this.props.rankedRestaurants) {
      let rank = 0
      return this.props.rankedRestaurants.map(rest => {
        rank += 1
        console.log(rest);
        return <RestaurantUserPage rank={rank} key={rest.id} restaurant={rest}/>
      })
    }
  }

  handleClick = (event) => {
    this.props.userPageToLoadFunction(event.target.name)
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
              <br></br>
            <button name='editRanking' onClick={this.handleClick} >Edit Your Rankings</button>
          </div>
        </div>
        <div className='restaurant-side-of-page'>
          <h1>Restaurants</h1>
          {this.props.userPageToLoad === 'renderRestaurants' ? this.renderRestaurants() : null}
          {this.props.userPageToLoad === 'addVisit' ? <AddVisit /> : null}
          {this.props.userPageToLoad === 'editRanking' ? <EditRanking /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    rankedRestaurants: state.rankedRestaurants,
    userPageToLoad: state.userPageToLoad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShowPage)
