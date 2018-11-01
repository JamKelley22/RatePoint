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
    let newPOIs = await this.getPOIsWithRatings(pois);
    console.log(newPOIs);
    this.setState({
      pois: newPOIs
    })
  }

  getPOIsWithRatings = async(pois) => {
    let newPOIs = [];
    for(var i = 0; i < pois.length; i++) {
      let rating = await POIAPI.GetPOIRating(pois[i].id)
      let newPOI = pois[i];
      newPOI.rating = rating.averageRating
      newPOIs.push(newPOI)
    }
    return newPOIs;
  }

  getPOIRating = async(id) => {
      return await POIAPI.GetPOIRating(id)
  }

  onPOICardClick = (poi) => {
    //Update Redux
    this.props.Actions.setPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  render () {
    console.log(this.state.pois);
    let cards = this.state.pois.map((poi,i) => {
      return (
        <POICard
          title={poi.name}
          key={i}
          pic={poi.pictures.length > 0 ? poi.pictures[0] : null}
          rating={poi.rating}
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
