import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, InfoBox} from 'google-maps-react';
import { connect } from 'react-redux'
import {bindActionCreators, compose} from 'redux';

import { history, routes } from '../../history.js'

import { POIAPI } from '../../api/'
import * as Actions from '../../actions/actions.js'

import { Navagation } from '../index.js'

import './map.scss'

/*
approved: true,
coordinates: { lat: 42.028770, lng: -93.618055 },
description: 'POI 1 Desc',
id: 19,
name: 'POI 1',
rating: 1
*/

class MapContainer extends React.Component {
  state = {
    pois: []
  }

  componentDidMount = () => {
    this.getPOIS();
  }

  getPOIS = async() => {
    let pois = await POIAPI.GetPOIs();

    this.setState({
      /*markers: pois.filter(poi => {
        return poi.rating > this.props.ratingFilterNum;
      })*/
      pois: pois
    })
  }

  /*
  componentWillReceiveProps() {//Apparently this is being depracated...
    let filteredPOIS = fakePOIData.filter(poi => {
      return poi.rating >= this.props.ratingFilterNum;
    })
    //console.log(filteredPOIS);
    this.setState({
      markers: filteredPOIS
    })
  }
  */

  onPOIClick = (poi) => {
    //alert(poi.name);
    //Update Redux
    this.props.Actions.setPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  render () {
    const style = {
      maxWidth: '100%',
      maxHeight: '92%'
    }
    let ISU = {
      lat: 42.026682,
      lng: -93.646449
    }
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={style}
        initialCenter={ISU}
        >
        {
          this.state.pois.map((marker, i) => {
            let coordinatesArr = marker.coordinates.split(',');
            let lat = coordinatesArr[0];
            let long = coordinatesArr[1];
            let coordinates = {
              lat: lat,
              lng: long
            }
            return (
              <Marker
                position={coordinates}
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

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

const composedHoc = compose(
    connect(mapStateToProps,mapDispatchToProps),
    GoogleApiWrapper({apiKey: ('AIzaSyC5q54v6n33maflm2zG1WjVrD43AOYa6YM')})
)(MapContainer);

export default composedHoc;
