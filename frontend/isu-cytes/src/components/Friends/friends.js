import React from 'react'
import { compose } from 'redux';

import { withAuthentication, withNav } from '../../hoc'
import { Navagation } from '../index.js'

import './friends.scss'

class Friends extends React.Component {
  render () {
    return (
      <div className='friendsPage'>
        <h1>Friends</h1>
      </div>
    );
  }
}

export default compose(
    withAuthentication,
    withNav
)(Friends);
