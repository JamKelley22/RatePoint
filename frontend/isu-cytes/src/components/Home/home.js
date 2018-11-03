import React from 'react'
import { compose } from 'redux';

import { withAuthentication, withNav } from '../../hoc'
import { Navagation } from '../index.js'

import './home.scss'

class Home extends React.Component {
  render () {
    return (
      <div className='homePage'>
        <h1>Home</h1>
      </div>
    );
  }
}

export default compose(
  withAuthentication,
  withNav
)(Home);
