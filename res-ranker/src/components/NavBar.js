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
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact">
          Contact Us
        </NavLink>
      </li>
    </ul>
  );
}

export default NavBar
