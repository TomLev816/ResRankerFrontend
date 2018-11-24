import React from 'react';



export default function SmallRestaurantComponent(props) {
  return (
    <div className='small-restaurant-component'>
      <div className='small-restaurant-component-img'>
        <img src={props.restaurant.image_src} alt="" />
      </div>
      <div className='small-restaurant-component-info'>
        <h2>{props.restaurant.name}</h2>
      </div>
    </div>
  );
}
