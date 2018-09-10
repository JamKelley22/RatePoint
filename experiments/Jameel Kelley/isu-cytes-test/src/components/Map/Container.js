import React from 'react'
import PropTypes from 'prop-types'
import GoogleApiComponent from './GoogleApiComponent.js'
import Map from './Map.js'
import Marker from './Marker.js'

import './Container.css'

import {API_KEY} from '../../secrets.js'

export class Container extends React.Component {
  render() {
    const pos = {lat: 42.0266, lng: -93.6465}
    return (
      <div id='mapContainer'>
        <Map google={this.props.google}>
          <Marker pos={pos}/>
        </Map>
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: API_KEY
})(Container)
