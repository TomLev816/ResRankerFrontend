import React from 'react';
import PropTypes from 'prop-types';


export default function EditRanking(props) {
  return (
    <div>Edit Ranking</div>
  );
}

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
