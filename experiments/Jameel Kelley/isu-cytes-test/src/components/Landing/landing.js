import React from 'react'
import { NavLink } from 'react-router-dom';

import './landing.css'

import * as routes from '../../constants/routes.js'

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

              <NavLink
                className='header__link'
                activeClassName='is-active'
                to={routes.LANDING}>
                Test
              </NavLink>

              <NavLink
                className='header__link'
                activeClassName='is-active'
                to={routes.LANDING}>
                Test
              </NavLink>

              <NavLink
                className='header__link'
                activeClassName='is-active'
                to={routes.LANDING}>
                Test
              </NavLink>
            </div>
          </div>
          {/*===============================*/}
          <div id='body'>
            <h1>Lorim Ipsum Set Dolor</h1>
            <h5>Lorim Ipsum Set Dolor</h5>
            <div id='body__button--account'>
              <button className='button signup'>Sign Up</button>
              <button className="button login">Login</button>
            </div>
          </div>
          {/*===============================*/}
          <div id='footer'>
            <div id='infoPiece'>
              <i className="far fa-thumbs-up"></i>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div id='infoPiece'>
              <i className="fas fa-trophy"></i>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div id='infoPiece'>
              <i className="far fa-clock"></i>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div id='infoPiece'>
              <i className="fas fa-car"></i>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
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
