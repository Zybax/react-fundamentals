import React, { Component } from 'react';
import ReactRouter from 'react-router-dom';
import { NavLink } from 'react-router-dom';

 const Nav = () => {
  return (
    <ul className="nav">
        <li>
            <NavLink exact activeClassName="active" to='/' >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName='active' to='/battle'>
                Battle
            </NavLink>
        </li>
        <li>
        <NavLink activeClassName='active' to='/popular'>
             Popular
        </NavLink>
        </li>
    </ul>
  )
}

export default Nav
