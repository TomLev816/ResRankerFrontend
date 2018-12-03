import React from 'react';
import {NavLink} from 'react-router-dom'


const NavBar = (props) => {

  return (
    <ul className="topnav">
      <li>
        <NavLink to='/ResRanker' >
          ResRanker
        </NavLink>
      </li>
      <li>
        <NavLink to="/home" >
          Add Visit
        </NavLink>
      </li>
      <li>
        <NavLink to="/user-page">
          Your Page
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact">
          Add Restaurants
        </NavLink>
      </li>
    </ul>
  );
}



export default (NavBar)
