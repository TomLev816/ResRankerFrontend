import React from 'react';
import DragAndDrop from '../components/DragAndDrop'
import { connect } from 'react-redux'
import { userPageToLoadAction } from '../store/actions/'

const handleClick = ({rankedRestaurants, userPageToLoadFunction, userLoggedIn}) => {
  rankedRestaurants.map((userResRank, index) => {
    return fetch(`http://localhost:4000/api/v1/user_restaurant_rankings/${userResRank.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        'ranking': index,
      }),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
  })
  userPageToLoadFunction('renderRestaurants')
}

function EditRanking(props) {
  return (
    <div className='rankings-container'>
      <center>
        <button onClick={() => handleClick(props)}>Submit Changes</button>
        <h2>Edit Ranking Your Rankings</h2>
        <DragAndDrop />
      </center>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rankedRestaurants: state.rankedRestaurants,
    userLoggedIn: state.userLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRanking)
