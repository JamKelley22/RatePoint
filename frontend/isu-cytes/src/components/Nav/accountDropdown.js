import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { history, routes } from '../../history.js'

const AccountDropdown = (props) => {
  return (
    <div className='accountDropdownComponent'>
      <div className={`accountBox ${props.accountDropdownVisible ? '' : '--hidden'}`}>
        {
          props.links.map((link,i) => {
            if(link.visible)
              return (
                <NavLink
                  className='account__link'
                  to={link.dest}
                  key={i}
                  onClick={link.action}>
                  {link.name}
                </NavLink>
              )
          })
        }
      </div>
    </div>
  )
}

export default AccountDropdown;

AccountDropdown.propTypes = {
  accountDropdownVisible: PropTypes.bool,
  links: PropTypes.array
}

AccountDropdown.defaultProps = {
  accountDropdownVisible: false,
  links: []
}
