import React from 'react'
import PropTypes from 'prop-types'


import { history, routes } from '../../history.js'
import POICard from '../Explore/poiCard.js'

import './home.scss';

class Feed extends React.Component {
  state = {
    poiExpanded: false,
    peopleExpanded: false,
    reviewExpanded: false,

    poiFilter: 'top',//[new, top, low]
    peopleFilter: 'new',//[new]
    reviewFilter: 'top'//[new || top || low]
  }

  onPOICardClick = (poi) => {
    //Update Redux
    this.props.setSelectedPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  render() {
    console.log(this.props.poiList);

    let poiList = this.props.poiList;

    switch (this.state.poiFilter) {
      case 'new':
        //alredy sorted by new
        break;
      case 'top':
        poiList.sort((a,b) =>
            parseFloat(a.rating) > parseFloat(b.rating)
        )
        break;
      case 'low':
        console.log("bef");
        console.log(poiList);
        poiList.sort((a,b) => {
          console.log(parseFloat(a.rating));
          console.log(parseFloat(b.rating));
          return(
            parseFloat(a.rating) < parseFloat(b.rating)
          )
        })
        console.log("aft");
        console.log(poiList);
        break;
      default:

    }

    let poiListFeed = poiList.map((poi,i) => {
      if(poi.approved) {
        return (
          <POICard
            size='small'
            title={poi.name}
            key={i}
            pic={poi.pictures}
            rating={poi.rating}
            onClick={() => this.onPOICardClick(poi)}
            delay={i * .1}
          />
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
        <div className='feedSection'>
          <h3>POIs <a className='feedExpand' onClick={() => this.setState({poiExpanded: !this.state.poiExpanded})}>{this.state.poiExpanded ? 'Minimize' : 'Exapnd'}</a></h3>
          <div className='filters'>
            <a
              style={{textDecoration: this.state.poiFilter === 'new' ? 'underline' : 'none'}}
              onClick={() => this.setState({poiFilter: 'new'})}>
              New
            </a>
            |
            <a
              style={{textDecoration: this.state.poiFilter === 'top' ? 'underline' : 'none'}}
              onClick={() => this.setState({poiFilter: 'top'})}>
               Top
            </a>
            |
            <a
              style={{textDecoration: this.state.poiFilter === 'low' ? 'underline' : 'none'}}
              onClick={() => this.setState({poiFilter: 'low'})}>
              Low
            </a>
          </div>
          <hr/>
          <div className='poiFeed'>
            {
              this.state.poiExpanded ?
              poiListFeed
              :
              poiListFeed.slice(0,3)
            }
          </div>
        </div>
        <div>
          <h3>People</h3>
          <div className='filters'>
            <a
              style={{textDecoration: this.state.peopleFilter === 'new' ? 'underline' : 'none'}}
              onClick={() => this.setState({peopleFilter: 'new'})}>
              New
            </a>
            |
            <a
              style={{textDecoration: this.state.peopleFilter === 'hot' ? 'underline' : 'none'}}
              onClick={() => this.setState({peopleFilter: 'hot'})}>
              Hot
            </a>
          </div>
          {peopleListFeed}
        </div>
        <div>
          <h3>Reviews</h3>
          <div className='filters'>
            <a
              style={{textDecoration: this.state.reviewFilter === 'new' ? 'underline' : 'none'}}
              onClick={() => this.setState({reviewFilter: 'new'})}>
              New
            </a>
            |
            <a
              style={{textDecoration: this.state.reviewFilter === 'top' ? 'underline' : 'none'}}
              onClick={() => this.setState({reviewFilter: 'top'})}>
              Top
            </a>
            |
            <a
              style={{textDecoration: this.state.reviewFilter === 'low' ? 'underline' : 'none'}}
              onClick={() => this.setState({reviewFilter: 'low'})}>
              Low
            </a>
          </div>
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
