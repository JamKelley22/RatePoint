import React from 'react'
import PropTypes from 'prop-types'

import { history, routes } from '../../history.js'
import POICard from '../Explore/poiCard.js'
import Rating from '../POI/rating.js'
import { USER_ROLES } from '../../constants'

import './home.scss';

class Feed extends React.Component {
  state = {
    poiExpanded: false,
    peopleExpanded: false,
    reviewExpanded: false,

    poiFilter: 'top',//[top, low]
    peopleFilter: 'new',//[new,mod,admin]
    reviewFilter: 'top'//[top || low]
  }

  onPOICardClick = (poi) => {
    //Update Redux
    this.props.setSelectedPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  sort_by = (field, reverse, primer) => {
     var key = primer ?
         function(x) {return primer(x[field])} :
         function(x) {return x[field]};

     reverse = !reverse ? 1 : -1;
     return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
  }

  render() {

    let poiList = this.props.poiList;

    switch (this.state.poiFilter) {
      case 'top':
        poiList.sort(this.sort_by('rating', true, parseInt));
        break;
      case 'low':
        poiList.sort(this.sort_by('rating', false, parseInt));
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

    let personList = this.props.peopleList;

    switch (this.state.peopleFilter) {
      case 'new':

        break;
      case 'mod':
        personList = personList.filter(person => person.role >= USER_ROLES.MOD)
        break;
      case 'admin':
        personList = personList.filter(person => person.role >= USER_ROLES.ADMIN)
        break;
      default:
    }

    let peopleListFeed = personList.map((person,i) => {
      return (
        <div className='personCard' key={i}>
          <h4>{person.name}</h4>
          <p>{person.username}</p>
          <a onClick={() => this.props.onUserClick(person.username)}>View</a>
        </div>
      )
    });

    let reviewList = this.props.reviewList;

    switch (this.state.reviewFilter) {
      case 'top':
        reviewList.sort(this.sort_by('rating', true, parseInt));
        break;
      case 'low':
        reviewList.sort(this.sort_by('rating', false, parseInt));
        break;
      default:
    }

    let reviewListFeed = reviewList.map((review,i) => {
      if(!review.flagged) {
        return (
          <div className='reviewCard' key={i}>
            <h5>{review.title}</h5>
            <Rating
              number={review.rating}
            />
            By: <span>{review.author === null ? 'Anonymous' : review.author}</span>
            <p>{review.body}</p>
            <a onClick={() => this.props.viewPOIByNum(review.poi)}>View POI</a>
          </div>
        )
      }
    });

    return (
      <div className='feedComponent'>
        <div className='feedSection'>
          <div className='feedLine'>
            <h3>POIs <a className='feedExpand' onClick={() => this.setState({poiExpanded: !this.state.poiExpanded})}>{this.state.poiExpanded ? 'Minimize' : 'Exapnd'}</a></h3>
            <div className='filters'>
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
          </div>
          <hr/>
          <div className='feed'>
            {
              this.state.poiExpanded ?
              poiListFeed
              :
              poiListFeed.slice(0,3)
            }
          </div>
        </div>
        <div>
          <div className='feedLine'>
            <h3>People <a className='feedExpand' onClick={() => this.setState({peopleExpanded: !this.state.peopleExpanded})}>{this.state.peopleExpanded ? 'Minimize' : 'Exapnd'}</a></h3>
            <div className='filters'>
              <a
                style={{textDecoration: this.state.peopleFilter === 'new' ? 'underline' : 'none'}}
                onClick={() => this.setState({peopleFilter: 'new'})}>
                New
              </a>
              |
              <a
                style={{textDecoration: this.state.peopleFilter === 'mod' ? 'underline' : 'none'}}
                onClick={() => this.setState({peopleFilter: 'mod'})}>
                Mod
              </a>
              |
              <a
                style={{textDecoration: this.state.peopleFilter === 'admin' ? 'underline' : 'none'}}
                onClick={() => this.setState({peopleFilter: 'admin'})}>
                Admin
              </a>
            </div>
          </div>
          <hr/>
          <div className='feed'>
            {
              this.state.peopleExpanded ?
              peopleListFeed
              :
              peopleListFeed.slice(0,3)
            }
          </div>
        </div>
        <div>
          <div className='feedLine'>
            <h3>Reviews <a className='feedExpand' onClick={() => this.setState({reviewExpanded: !this.state.reviewExpanded})}>{this.state.reviewExpanded ? 'Minimize' : 'Exapnd'}</a></h3>
            <div className='filters'>
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
          </div>
          <hr/>
          <div className='feed'>
            {
              this.state.reviewExpanded ?
              reviewListFeed
              :
              reviewListFeed.slice(0,3)
            }
          </div>
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
