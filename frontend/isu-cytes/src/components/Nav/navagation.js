import React from 'react'
import { NavLink } from 'react-router-dom';

import * as routes from '../../constants/routes.js'

import './navagation.css'

class Navigation extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render () {
    return (
      <div className='navagation__bar'>
        <div className='navagation__logo'>
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._HOME}>
            <h3>ISU Cytes</h3>
          </NavLink>
        </div>
        <div className='navagation__links'>
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._HOME}>
            Home
          </NavLink>
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._MAP}>
            Map
          </NavLink>
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._EXPLORE}>
            Explore
          </NavLink>
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._FRIENDS}>
            Friends
          </NavLink>
        </div>
        <div className='navagation__searchbar'>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input type='text' name='name' className='navagation__searchbar__input'/>
            <button type='submit' className='navagation__searchbar__submit'><i className="fas fa-search"/></button>
          </form>
        </div>
        <div className='navagation__links'>
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._SUGGEST}>
            Suggest a Location
          </NavLink>
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._ACCOUNT}>
            Account
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Navigation;
