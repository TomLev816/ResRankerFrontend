import React from 'react';
import { connect } from 'react-redux'
import RestaurantUserPage from '../components/RestaurantUserPage.js'
import {Redirect} from 'react-router-dom'
import AddRestaurant from '../components/AddRestaurant'
import EditRanking from '../components/EditRanking'
import { userPageToLoadAction } from '../store/actions/'


let renderRestaurants = (rankedRestaurants, userLoggedIn) => {
  if (rankedRestaurants) {
    let rank = 0
    return rankedRestaurants.map(rest => {
      rank += 1
      return <RestaurantUserPage rank={rank} key={rest.id} user={userLoggedIn} restaurantId={rest.restaurant_id}/>
    })
  }
}

let handleClick = (event, userPageToLoadFunction) => {
  userPageToLoadFunction(event.target.name)
}

function UserShowPage({userLoggedIn, userPageToLoad, rankedRestaurants, userPageToLoadFunction}) {


    return (
      <div className='user-show-page'>
        <div className='user-side-of-page'>
          <div className='user-pic'>
            <img src={userLoggedIn.image_src} alt=''></img>
          </div>
          <div className='user-info'>
            <h1>Username: {userLoggedIn.username}</h1>
            <h2>Name: {userLoggedIn.first}</h2>
            <h3>Restaurants Visited: {userLoggedIn.restaurants_visited} </h3>
          </div>
          <div className='add-buttons'>
            {userPageToLoad === "editRanking" ? null : <button name='AddRestaurant' onClick={(e) => handleClick(e, userPageToLoadFunction)} >Add New Restaurant</button>}
            <br></br>
            {userPageToLoad === "editRanking" ? null : <button name='renderRestaurants' onClick={(e) => handleClick(e, userPageToLoadFunction)} >View Your Restaurants</button>}
            <br></br>
            {userPageToLoad === "editRanking" ? null : <button name='editRanking' onClick={(e) => handleClick(e, userPageToLoadFunction)} >Edit Your Rankings</button>}
            {userPageToLoad === "editRanking" ? null : <button name='searchRestaurants' onClick={(e) => handleClick(e, userPageToLoadFunction)} >Search Restaurants</button>}
          </div>
        </div>
        <div className='restaurant-side-of-page'>
          <h1>Restaurants</h1>
          {userPageToLoad === 'renderRestaurants' ? renderRestaurants(rankedRestaurants, userLoggedIn) : null}
          {userPageToLoad === 'AddRestaurant' ? <AddRestaurant /> : null}
          {userPageToLoad === 'editRanking' ? <EditRanking /> : null}
          {userPageToLoad === 'searchRestaurants' ? <Redirect to={'/view-restaurants'} /> : null}
        </div>
      </div>
    );

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
