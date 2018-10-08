import React from 'react'

import Navagation from '../Nav/navagation.js'
import POICard from './poiCard.js'
import Moth from '../../images/moth.jpg'

import './explore.css'

class Explore extends React.Component {
  render () {
    return (
      <div id='exploreComponent'>
        <Navagation/>
        <div id='explorePage'>
          <POICard
            title='Coover Moth'
            pic={Moth}
            rating={5}
          />
        </div>
      </div>
    );
  }
}

export default Explore;
