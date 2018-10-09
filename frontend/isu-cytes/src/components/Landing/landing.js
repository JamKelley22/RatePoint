import React from 'react'
import { NavLink } from 'react-router-dom';

import { routes } from '../../history.js'
import { Button } from '../../util'

import './landing.scss'

class Landing extends React.Component {
  render () {
    return (
      <div className='landing'>
        <div className='landingNavagation'>
          <NavLink
            className='link'
            activeClassName='is-active'
            to={routes._HOME}>
            Home
          </NavLink>
          <NavLink
            className='link'
            activeClassName='is-active'
            to={routes._MAP}>
            Map
          </NavLink>
          <NavLink
            className='link'
            activeClassName='is-active'
            to={routes._EXPLORE}>
            Explore
          </NavLink>
          <NavLink
            className='link'
            activeClassName='is-active'
            to={routes._FRIENDS}>
            Friends
          </NavLink>
        </div>

        <div className='centerInfo'>
          <div className='tagLine'>
            Local Student Ratings & Reviews
          </div>
          <div className='subtitle'>
            Lorim Ipsum Set Dolor
          </div>
          <div className='buttons'>
            <Button
              name='Sign Up'
              onClick={() => console.log("Sign Up")}
            />
            <Button
              name='Log In'
              onClick={() => console.log("Log In")}
            />
          </div>
        </div>

        <div className='lower'>

        </div>
      </div>
    );
  }
}

export default Landing;
