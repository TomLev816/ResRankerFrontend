import React, { Component } from 'react';
import {connect} from 'react-redux'
import SearchMultiRestaurants from '../components/SearchMultiRestaurants'
// import HalfPageRankRestaurants from '../components/HalfPageRankRestaurants'
import { rankedRestaurantsAction, userLoggedInAction, userPageToLoadAction } from '../store/actions/'
import { Redirect} from 'react-router-dom'
import DragAndDrop from '../components/DragAndDrop'


class AddMultipleRestaurants extends Component {

state = {
  reDirect: false
}


  handleSubmit = () => {
    this.props.userPageToLoadFunction('renderRestaurants')
    if (this.props.rankedRestaurants.length > 4) {
      this.props.rankedRestaurants.map((restaurant, index) => {
        fetch(`http://localhost:4000/api/v1/user_restaurant_rankings/${restaurant.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            "ranking": index + 1,
          }),
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(res => res.json())
        .then(resJson =>  this.setState({
          reDirect: true,
        }))
        return ""
      })
    } else {
      console.log('nonon')
    }
  }


  rankedRestaurants  = this.props.rankedRestaurants
  render() {
    console.log(this.props.rankedRestaurants);
    return (
        <div className='add-multiple-restaurants-page'>
          {this.state.reDirect ? <Redirect to='/user-page' /> : null}
          <div className='add-multi-res-header'>
            <center>
              <h1>Welcome</h1>
              <h3>Add 5 restaurants that you've been to and rank them</h3>
            </center>
          </div>
          <div className='add-multi-res-container'>
            <div className='add-multi-box'>
              <center>Search for restaurants you've been to</center>
              <SearchMultiRestaurants />
          </div>
            <div className='add-multi-box'>
              <center>
                Rank the restaurants
                <br></br>
                <button onClick={this.handleSubmit}>Submit Your List</button>
              </center>
              <DragAndDrop />
            </div>
          </div>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    allRestaurants: state.allRestaurants,
    rankedRestaurants: state.rankedRestaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newRankedRestaurantFunction: rankedRestaurants => dispatch(rankedRestaurantsAction(rankedRestaurants)),
    userLoggedInFunction: user => dispatch(userLoggedInAction(user)),
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddMultipleRestaurants)
