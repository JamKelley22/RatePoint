import React from 'react'

import './navagation.css'

class Navigation extends React.Component {
  render () {
    return (
      <div className='navagation__bar'>
        <div className='navagation__links'>
          <a href='#'>Test</a>
          <a href='#'>Test</a>
        </div>
      </div>
    );
  }
}

export default Navigation;
