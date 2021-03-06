import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { history, routes } from '../../history.js'
import { Button } from '../../util'
import Feature from './feature.js'

import './landing.scss'

class Landing extends React.Component {

  scroll = (to) => {
    document.querySelector(to).scrollIntoView({
      behavior: 'smooth'
    });
  }

  render () {
    return (
      <div className='landingWrapper'>
        <div className="backgroundImageContainer"><div className="backgroundImage"/></div>
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
            <div href='#' className='link sitetitle'>
              RatePoint
            </div>
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
              Find your new favorate place!
            </div>
            <div className='buttons'>
              <Button
                name='Sign Up'
                onClick={() => history.push(routes._CREATEACCOUNT)}
              />
              <Button
                name='Log In'
                onClick={() => history.push(routes._LOGIN)}
              />
            </div>
          </div>

          <div className='lower'>
            <Feature
              title='Ratings'
              body='Rate and Review Your Favorite Sites Around Campus'
              icon={<FontAwesomeIcon icon="thumbs-up" />}
            />
            <Feature
              title='Top Sites'
              body='View the top sites on campus and vote on the best per catagory'
              icon={<FontAwesomeIcon icon="trophy" />}
            />
            <Feature
              title='Explore'
              body='Explore your local ISU community and find the best place to study, play, and learn'
              icon={<FontAwesomeIcon icon="clock" />}
            />
            <Feature
              title='Share'
              body='Add your friends and share your favorite locations with them anytime'
              icon={<FontAwesomeIcon icon="car" />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
