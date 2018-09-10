import React from 'react'
import PropTypes from 'prop-types'

class Marker extends React.Component {
  componentDidMount() {
    //console.log("Marker");
  }

  componentDidUpdate(prevProps) {
    this.renderMarker();
    /*if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        console.log("Ren");
        this.renderMarker();
    }*/
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
    console.log(pref);
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
