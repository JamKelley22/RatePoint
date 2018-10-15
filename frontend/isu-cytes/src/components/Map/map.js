import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import { Navagation } from '../index.js'

import './map.scss'

class MapContainer extends React.Component {
  render () {
    return (
      <div>
        
        <div className='mapHolder'>
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={{
              lat: 42.026770,
              lng: -93.617055
            }}
          >
        </Map>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyC5q54v6n33maflm2zG1WjVrD43AOYa6YM')
})(Map);
