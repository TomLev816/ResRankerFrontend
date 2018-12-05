import React from 'react';
import { connect } from 'react-redux'
import RestaurantUserPage from '../components/RestaurantUserPage.js'
import {Redirect, NavLink} from 'react-router-dom'
import AddRestaurant from '../components/AddRestaurant'
import EditRanking from '../components/EditRanking'
import ViewVisits from './ViewVisits'
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

let renderButtons = (userPageToLoad, userPageToLoadFunction) => {
  if (userPageToLoad === "editRanking" ) {
    return null
  } else {
    return (
    <div>

      <button name='renderRestaurants' onClick={(e) => handleClick(e, userPageToLoadFunction)} >View Your Restaurants</button>
      <br></br>

      <button name='editRanking' onClick={(e) => handleClick(e, userPageToLoadFunction)} >Edit Your Rankings</button>
      <br></br>

      <button name='searchRestaurants' onClick={(e) => handleClick(e, userPageToLoadFunction)} >Search Restaurants</button>
      <br></br>

      <button name='viewVisits' onClick={(e) => handleClick(e, userPageToLoadFunction)} >View Your Visits</button>
    </div>
    )
  }
}

let handleClick = (event, userPageToLoadFunction) => {
  userPageToLoadFunction(event.target.name)
}


function UserShowPage({userLoggedIn, userPageToLoad, rankedRestaurants, userPageToLoadFunction, userMapLoadFunction }){
  return (
    <div className='user-show-page'>
      <div className='user-side-of-page'>
        <div className='user-pic'>
          <img src={userLoggedIn.image_src} alt=''></img>
        </div>
        <div className='user-info'>
          <h1>Username: {userLoggedIn.username}</h1>
          <h3>Restaurants Visited: {userLoggedIn.user_restaurant_rankings.length}</h3>
        </div>
        <div className='add-buttons'>
          {renderButtons(userPageToLoad, userPageToLoadFunction)}
        </div>
      </div>
      <div className='restaurant-side-of-page'>
        {userPageToLoad === 'renderRestaurants' ? <h1>Restaurants</h1> : null}
        {userPageToLoad === 'viewVisits' ? <h1>Your Recent Visits</h1> : null}
        {userPageToLoad === 'editRanking' ? <h1>Edit Your Rankings</h1> : null}

        {userPageToLoad === 'renderRestaurants' ? renderRestaurants(rankedRestaurants, userLoggedIn) : null}

        {userPageToLoad === 'editRanking' ? <EditRanking /> : null}
        {userPageToLoad === 'searchRestaurants' ? <Redirect to={'/view-restaurants'} /> : null}
        {userPageToLoad === 'viewVisits' ? <ViewVisits /> : null}
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
