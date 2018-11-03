import React from 'react'
import { compose } from 'redux';

import { withAuthentication, withNav } from '../../hoc'
import { Navagation } from '../index.js'

import './account.scss'

class Account extends React.Component {
  render () {
    return (
      <div className='accountPage'>
        <div className='accountContent'>

        </div>
      </div>
    );
  }
}

export default compose(
    withAuthentication,
    withNav
)(Account);
