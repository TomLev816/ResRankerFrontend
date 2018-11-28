import React from 'react';
// import {NavLink} from 'react-router-dom'

// props.visitRestaurantFunction(props.restaurant)

let handleEditVisit = (props) => {
  let {user, restaurant} = props
  console.log(restaurant.id);
  console.log(user);
  let toEdit = user.user_restaurant_rankings.filter(res => res.restaurant_id === restaurant.id)
  console.log(toEdit);
  //the user_restaurant_rank = toEdit.id
}

export default function RestaurantUserPage(props) {
  return (
    <div className='user-show-restaurant-visit'>

      <div className='rank-of-restaurant'>
        <h1>{props.rank}.</h1>
      </div>
      <div className='photo-of-restaurant'>
        <img src={props.restaurant.image_src} alt="" ></img>
        <button onClick={() => handleEditVisit(props)}>Edit Visit</button>
      </div>
      <div className='info-on-visit'>
        <h1>{props.restaurant.name}</h1>
        <h3>Located: {props.restaurant.address}</h3>
        <h3>Cusine: {props.restaurant.cuisine}</h3>
        </div>

    </div>
  );
}
