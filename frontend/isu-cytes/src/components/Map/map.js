import React from 'react'

import { Navagation } from '../index.js'
import MapContainer from './mapContainer.js'

import './map.scss'

class Map extends React.Component {
  state = {
    rangeSliderValue: 4
  }

  handleSliderChange = (e) => {
    e.preventDefault();
    this.setState({
      rangeSliderValue: e.target.value
    })
  }

  render () {
    return (
      <div className = 'map'>
        <Navagation/>
        <div className='mapContainer'>
          <span>Filter by: </span>
          <span>Range:</span>
          <input type="range" min="1" max="5" value={this.state.rangeSliderValue} onChange={this.handleSliderChange}/>
          <MapContainer
            ratingFilterNum={this.state.rangeSliderValue}
          />
        </div>
      </div>
    );
  }
}

export default Map;
