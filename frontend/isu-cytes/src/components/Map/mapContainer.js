import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, InfoBox} from 'google-maps-react';


import { Navagation } from '../index.js'

import './map.scss'

//For now lets just generate some fake data
let fakePOIData = [
  {
    approved: true,
    coordinates: { lat: 42.028770, lng: -93.618055 },
    description: 'POI 1 Desc',
    id: 19,
    name: 'POI 1',
    rating: 1
  },
  {
    approved: true,
    coordinates: { lat: 42.026770, lng: -93.617055 },
    description: 'POI 2 Desc',
    id: 39,
    name: 'POI 2',
    rating: 3
  },
  {
    approved: true,
    coordinates: { lat: 42.023770, lng: -93.616055 },
    description: 'POI 3 Desc',
    id: 49,
    name: 'POI 3',
    rating: 5
  }
]

class MapContainer extends React.Component {
  state = {
    markers: []
  }

  componentDidMount = () => {
    this.getPOIS();
  }

  getPOIS = async() => {
    let response = await fetch('http://proj309-tg-03.misc.iastate.edu:8080/pois/get');
    let poiData = await response.json();
    //Once this actually has correct coords in here we can map through them and render point s on map
    console.log(poiData);


    this.setState({
      markers: fakePOIData.filter(poi => {
        return poi.rating > this.props.ratingFilterNum;
      })
    })
  }

  componentWillReceiveProps() {//Apparently this is being depracated...
    let filteredPOIS = fakePOIData.filter(poi => {
      return poi.rating >= this.props.ratingFilterNum;
    })
    //console.log(filteredPOIS);
    this.setState({
      markers: filteredPOIS
    })
  }

  onPOIClick = (marker) => {
    alert(marker.name);
  }

  render () {
    const style = {
      maxWidth: '100%',
      maxHeight: '92%'
    }
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={style}
        initialCenter={{
            lat: 42.026770,
            lng: -93.617055
          }}
        >
        {
          this.state.markers.map((marker, i) => {
            return (
              <Marker
                position={marker.coordinates}
                key={i}
                onClick={() => this.onPOIClick(marker)}
              />
            );
          })
        }
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyC5q54v6n33maflm2zG1WjVrD43AOYa6YM')
})(MapContainer);
