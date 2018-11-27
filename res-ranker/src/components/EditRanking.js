import React from 'react';
import DragAndDrop from '../components/DragAndDrop'
import { connect } from 'react-redux'

const handleClick = ({rankedRestaurants}) => {
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
          .then(resJson =>  console.log(resJson))
        })
        
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

export default connect(mapStateToProps)(EditRanking)

//   on edit submit it will be
// ```
//       this.props.rankedRestaurants.map((restaurant, index) => {
//         return fetch('http://localhost:4000/api/v1/user_restaurant_rankings', {
//           method: 'PATCH',
//           body: JSON.stringify({
//             "ranking": index + 1,
//           }),
//           headers:{
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           }
//         })
//         .then(res => res.json())
//         .then(resJson =>  console.log(resJson))
//       })
// ```
