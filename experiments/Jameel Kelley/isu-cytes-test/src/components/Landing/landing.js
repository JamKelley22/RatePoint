import React from 'react'
import { NavLink } from 'react-router-dom';

import './landing.css'

import * as routes from '../../constants/routes.js'
import Feature from './feature.js'

class Landing extends React.Component {
  render () {
    return (
      <div id='landing'>
        <div id='bridgeBackround'/>
        <div id='block1'>
          <div id='header'>
            <div id='header__links'>
              <NavLink
                className='header__link'
                activeClassName='is-active'
                to={routes.HOME}>
                Home
              </NavLink>
              <p>|</p>
              <NavLink
                className='header__link'
                activeClassName='is-active'
                to={routes.HOME}>
                Map
              </NavLink>
              <p>|</p>
              <NavLink
                className='header__link'
                activeClassName='is-active'
                to={routes.LANDING}>
                Team
              </NavLink>
              <p>|</p>
              <NavLink
                className='header__link'
                activeClassName='is-active'
                to={routes.LANDING}>
                Help
              </NavLink>
            </div>
          </div>
          {/*===============================*/}
          <div id='body'>
            <h1>Local Student Ratings and Reviews</h1>
            <h5></h5>
            <div id='body__button--account'>
              <button className='button signup'>Sign Up</button>
              <button className="button login">Login</button>
            </div>
          </div>
          {/*===============================*/}
          <div id='footer'>
            <Feature
              icon='far fa-thumbs-up'
              title='Ratings'
              desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <Feature
              icon='fas fa-trophy'
              title='Top Sites'
              desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <Feature
              icon='far fa-clock'
              title='Ratings'
              desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
            <Feature
              icon='fas fa-car'
              title='Ratings'
              desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
          </div>
        </div>

        <div id='block2'>

        </div>

        <div id='block3'>

        </div>
      </div>
    );
  }
}

export default Landing;
