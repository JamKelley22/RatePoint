import React from 'react'

import './home.css'

import Container from '../Map/Container.js'

class Home extends React.Component {
  render () {
    return (
      <div id='home'>
        <h1>Home</h1>
        <Container/>
      </div>
    );
  }
}

export default Home;
