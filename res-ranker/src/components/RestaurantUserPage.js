import React from 'react';



export default function RestaurantUserPage(props) {
  return (
    <div className='user-show-restaurant-visit'>
      <div className='rank-of-restaurant'>
        <h1>{props.rank}.</h1>
      </div>
      <div className='photo-of-restaurant'>
        <img src={props.restaurant.restaurant.image_src} alt="" ></img>
      </div>
      <div className='info-on-visit'>
        <h1>{props.restaurant.restaurant.name}</h1>
        <h3>Located: {props.restaurant.restaurant.address}</h3>
        <h3>Cusine: {props.restaurant.restaurant.cuisine}</h3>
      </div>
    </div>
  );
}
