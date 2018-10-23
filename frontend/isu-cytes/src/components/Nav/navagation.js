import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { routes } from '../../history.js'

import './navagation.scss'

class Navigation extends React.Component {
  state = {
    accountVisible: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  toggleAccount = () => {
    this.setState({
      accountVisible: !this.state.accountVisible
    })
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

          <div
            className='navagation__link__account'
            onClick={this.toggleAccount}>
            Account <FontAwesomeIcon icon="caret-down" />
          <div className={`accountBox ${this.state.accountVisible ? '' : '--hidden'}`}>
              <NavLink
                className='account__link'
                to={routes._ACCOUNT}>
                View
              </NavLink>
              <NavLink
                className='account__link'
                to={routes._LOGIN}>
                Login
              </NavLink>
              <NavLink
                className='account__link'
                to={routes._CREATEACCOUNT}>
                Signup
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
