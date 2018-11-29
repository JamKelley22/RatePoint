import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import { withAuthentication, withNav } from '../../hoc'
import { Navagation } from '../index.js'
import POICard from './poiCard.js'
import Moth from '../../images/moth.jpg'
import { history, routes } from '../../history.js'
import { POIAPI } from '../../api/'
import * as Actions from '../../actions/actions.js'

import './explore.scss'

class Explore extends React.Component {
  state = {

  }

  onPOICardClick = (poi) => {
    //Update Redux
    this.props.Actions.setSelectedPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  render () {
    let cards;
    //console.log(this.props.pois);
    if(this.props.pois) {
      cards = this.props.pois.map((poi,i) => {
        if(poi.approved) {
          return (
            <POICard
              title={poi.name}
              key={i}
              pic={poi.pictures}
              rating={poi.rating}
              onClick={() => this.onPOICardClick(poi)}
              delay={i * .1}
            />
          )
        }
      })
    }

    return (
        <div id='explorePage'>
        {cards}
        </div>
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

export default compose(
  withNav,
  connect(mapStateToProps,mapDispatchToProps)
)(Explore);
