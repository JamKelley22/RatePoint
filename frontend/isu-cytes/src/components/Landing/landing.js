import React from 'react'
import { NavLink } from 'react-router-dom';

import { routes } from '../../history.js'

import './landing.css'

class Landing extends React.Component {
  render () {
    return (
      <div>
        <h1>Landing</h1>
        <NavLink
          className='header__link'
          activeClassName='is-active'
          to={routes._POI}>
          POI
        </NavLink>
      </div>
    );
  }
}

export default Landing;
