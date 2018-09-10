import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './map.css'

class Map extends React.Component {
  constructor(props) {
    super(props);
    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.loadMap();
  }

  loadMap = () => {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      console.log(this.map);
    }
  }

  render() {
    return (
      <div id='map' ref='map'>
        Loading map...
      </div>
    )
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object
}

Map.defaultProps = {
  zoom: 16,
  // Ames, by default
  initialCenter: {
    lat: 42.0266,
    lng: -93.6465
  }
}

export default Map;
