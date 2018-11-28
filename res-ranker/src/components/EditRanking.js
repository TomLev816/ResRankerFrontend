import React from 'react';
import DragAndDrop from '../components/DragAndDrop'
import { connect } from 'react-redux'
import { userPageToLoadAction } from '../store/actions/'

const handleClick = ({rankedRestaurants, userPageToLoadFunction}) => {
  rankedRestaurants.map((restaurant, index) => {

    return fetch(`http://localhost:4000/api/v1/user_restaurant_rankings/${restaurant.id}`, {
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
    .then(resJson =>  console.log('here',resJson))
  })
  userPageToLoadFunction('renderRestaurants')
}


function EditRanking(props) {
  return (
    <div>
      <button onClick={() => handleClick(props)}>Submit Changes</button>
      <h2>Edit Ranking Your Rankings</h2>
      <DragAndDrop />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    rankedRestaurants: state.rankedRestaurants
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditRanking)
