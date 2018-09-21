import React from 'react'

import Navagation from '../Nav/navagation.js'

import './poi.css'

class POI extends React.Component {

  componentDidMount() {
    fetch('https://http://localhost:3000/posts', {
    	method: 'get'
    }).then(function(response) {
    	console.log(response);
    }).catch(function(err) {
    	// Error :(
    });
  }

  render () {
    return (
      <div>
        <Navagation/>
        <h1>POI</h1>
      </div>
    );
  }
}

export default POI;
