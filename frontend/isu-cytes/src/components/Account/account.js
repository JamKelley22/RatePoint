import React from 'react'

import { Navagation } from '../index.js'

import './account.scss'

class Account extends React.Component {
  render () {
    return (
      <div className='accountPage'>
        <Navagation/>
        <div className='accountContent'>

        </div>
      </div>
    );
  }
}

export default Account;
