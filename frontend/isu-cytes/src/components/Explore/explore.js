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
    this.props.Actions.setPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  render () {
    let cards;
    //console.log(this.props.pois);
    if(this.props.pois) {
      cards = this.props.pois.map((poi,i) => {
        return (
          <POICard
            title={poi.name}
            key={i}
            pic={(poi.pictures && poi.pictures.length > 0) ? poi.pictures[0] : null}
            rating={poi.rating}
            onClick={() => this.onPOICardClick(poi)}
          />
        )
      })
    }

    return (
      <div id='exploreComponent'>
        <div id='explorePage'>
        {cards}
        </div>
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
