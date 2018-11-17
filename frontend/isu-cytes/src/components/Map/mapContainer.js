import React from 'react'
import ReactDOM from 'react-dom';
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
    activeMarker: {},
    activePOI: {},
    selectedPlace: {},
    showingInfoWindow: false
  }

  onMarkerClick = (props, marker, e, poi) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      activePOI: poi,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {},
        activePOI: {}
      })
    }
  }

  onInfoWindowOpen(props, e) {
    ReactDOM.render(
      React.Children.only(<a id='mapViewPOIA' onClick={this.goToPOI}>View</a>),
      document.getElementById("iwc")
    );
  }

  goToPOI = () => {
    console.log("Here");
    if(this.state.activePOI) {

      //Update Redux
      this.props.Actions.setPOI(this.state.activePOI);
      //Push new history
      history.push(routes._POI);
    }
    else {
      console.error("No Active POI Set");
    }
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
        onClick={this.onMapClicked}
        >
        {
          this.props.pois.map((poi, i) => {
            let coordinatesArr = poi.coordinates.split(',');
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
                onClick={(props, marker, e) => this.onMarkerClick(props, marker, e, poi)}
                id='mapMarker'
              />
            );
          })
        }
        {
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={e => {
              this.onInfoWindowOpen(this.props, e);
            }}
            style={{
              backgroundColor: 'red'
            }}
          >
            <div className='infoBox'>
              <h1>{this.state.activePOI.name}</h1>
              <div id="iwc" />
            </div>
          </InfoWindow>
        }
      </Map>
    );
  }
}

function mapStateToProps(state) {
  return {
    pois: state.poi.allPOIs
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
