import React from 'react'
import PropTypes from 'prop-types'

class Marker extends React.Component {
  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    this.renderMarker();
  }

  renderMarker() {
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);

    const pref = {
      map: map,
      position: position
    };
    this.marker = new google.maps.Marker(pref);
  }

  render () {
    return null;
  }
}

Marker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object
}

export default Marker;
