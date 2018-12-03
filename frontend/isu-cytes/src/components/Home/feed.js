import React from 'react'
import PropTypes from 'prop-types'

import { history, routes } from '../../history.js'
import POICard from '../Explore/poiCard.js'

import './home.scss';

class Feed extends React.Component {

  onPOICardClick = (poi) => {
    //Update Redux
    this.props.setSelectedPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  render() {
    let poiListFeed = this.props.poiList.map((poi,i) => {
      if(poi.approved) {
        return (
          <div key={i}>
            {poi.name}
          </div>
        )
      }
    });

    let peopleListFeed = this.props.peopleList.map((person,i) => {
      return (
        <div key={i}>
          {person.name}
        </div>
      )
    });

    let reviewListFeed = this.props.reviewList.map((review,i) => {
      return (
        <div key={i}>
          {review.title}
        </div>
      )
    });

    return (
      <div className='feedComponent'>
        <h2>Feed</h2>
        <div>
          <h3>POIs</h3>
          {poiListFeed}
        </div>
        <div>
          <h3>People</h3>
          {peopleListFeed}
        </div>
        <div>
          <h3>Reviews</h3>
          {reviewListFeed}
        </div>
      </div>
    )
  }
}

export default Feed;

Feed.propTypes = {
  poiList: PropTypes.array,
  peopleList: PropTypes.array,
  reviewList: PropTypes.array
}

Feed.defaultProps = {
  poiList: [],
  peopleList: [],
  reviewList: []
}

/*

{props.peopleList}

{props.reviewList}
*/
