import React from 'react'
import ReactDOM from 'react-dom';

import './map.css'

class Map extends React.Component {
  state = {

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

      let zoom = 16;
      let lat = 42.0266
      let lng = -93.6465;
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

export default Map;
