import React from 'react'

import { Navagation } from '../index.js'
import POICard from './poiCard.js'
import Moth from '../../images/moth.jpg'

import { POIAPI } from '../../api/'

import './explore.scss'

class Explore extends React.Component {
  state = {
    pois: []
  }

  componentDidMount = async() => {
    let pois = await POIAPI.GetPOIs();
    console.log(pois);
    this.setState({
      pois: pois
    })
  }

  render () {
    let cards = this.state.pois.map((poi,i) => {
      return (
        <POICard
          title={poi.name}
          key={i}
        />
      )
    })
    return (
      <div id='exploreComponent'>
        <Navagation/>
        <div id='explorePage'>
          <POICard
            title='Coover Moth'
            pic={Moth}
            rating={5}
          />
        {cards}
        {cards}
        </div>
      </div>
    );
  }
}

export default Explore;
