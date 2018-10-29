import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import { Navagation } from '../index.js'
import POICard from './poiCard.js'
import Moth from '../../images/moth.jpg'

import { history, routes } from '../../history.js'

import { POIAPI } from '../../api/'

import * as Actions from '../../actions/actions.js'

import './explore.scss'

class Explore extends React.Component {
  state = {
    pois: []
  }

  componentDidMount = async() => {
    let pois = await POIAPI.GetPOIs();
    console.log(pois);
    this.setState({
      pois: pois
    })
  }

  onPOICardClick = (poi) => {
    console.log("onPOICardClick");
    //Update Redux
    this.props.Actions.setPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  render () {
    let cards = this.state.pois.map((poi,i) => {
      return (
        <POICard
          title={poi.name}
          key={i}
          onClick={() => this.onPOICardClick(poi)}
        />
      )
    })
    return (
      <div id='exploreComponent'>
        <Navagation/>
        <div id='explorePage'>
        {cards}
        </div>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
