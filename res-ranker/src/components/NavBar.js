import React from 'react';
import {NavLink} from 'react-router-dom'


const NavBar = (props) => {

  return (
    <ul className="topnav">
      <li>
        <NavLink to='/home' >
          ResRanker
        </NavLink>
      </li>
      <li>
        <NavLink to="/user-map-page" >
          See Your Map
        </NavLink>
      </li>
      <li>
        <NavLink to="/user-page">
          Your Page
        </NavLink>
      </li>
      <li>
        <NavLink to="/ResRanker">
          About ResRanker
        </NavLink>
      </li>
    </ul>
  );
}



export default (NavBar)
