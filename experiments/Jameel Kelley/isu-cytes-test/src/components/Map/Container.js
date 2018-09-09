import React from 'react'
import PropTypes from 'prop-types'
import GoogleApiComponent from './GoogleApiComponent.js'
import Map from './Map.js'

import './Container.css'

import {API_KEY} from '../../secrets.js'

export class Container extends React.Component {
  render() {
    return (
      <div id='mapContainer'>
        <Map
          google={this.props.google}
        />
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: API_KEY
})(Container)
