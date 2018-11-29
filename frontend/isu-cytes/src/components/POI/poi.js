import React from 'react'
import { NavLink } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { TwitterShareButton, FacebookShareButton, RedditShareButton, EmailShareButton } from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import { Redirect } from "react-router-dom";

import { withNav } from '../../hoc'
import { history, routes } from '../../history.js'
import { Navagation } from '../index.js'
import { ReviewAPI, POIAPI } from '../../api'
import * as Actions from '../../actions/actions.js'

import POICarousel from './poiCarousel.js'
import Rating from './rating.js'
import Tag from './tag.js'
import Review from './review.js'

import './poi.scss'

class POI extends React.Component {
  state = {
    /*
    id: undefined,
    name: '',
    images: [],
    rating: 0,
    numRatings: 0,
    accessability: [],
    description: '',
    tags: [],
    */
    reviews: [],
    shareScreenState: false,
    descriptionScrollState: 'hidden',
    shareButtonClassName: 'poi__lower__button',
    listButtonClassName: 'poi__lower__button',
    reviewButtonClassName: 'poi__lower__button',
    reportButtonClassName: 'poi__lower__button',
    numRatings: 0
  }

  componentDidMount = async() => {
    //this.fetchDataFromServer();
    this.getReviews();
    let numRatings = await POIAPI.GetPOINumRatings(this.props.poi.id);
    this.setState({
      numRatings: numRatings
    })
  }

  getReviews = async() => {
    if(this.props.poi === null) {
      console.error("Null POI");
      return;
    }

    let reviews = await ReviewAPI.GetReviewsByPOI(this.props.poi.id)
    if(reviews.Error) {
      console.error(reviews.Error);
      return;
    }
    this.setState({
      reviews: reviews
    })

  }



/*
  fetchDataFromServer = async() => {
    let response = await fetch('http://proj309-tg-03.misc.iastate.edu:8080/reviews/get');
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    let currPOI = 1;
    let poiData = data.filter(review => {
      return review.poi === currPOI;
    })
    let totalRatingScore = 0;
    poiData.forEach(review => {
      totalRatingScore += parseInt(review.rating)
    })

    this.setState({
      id: currPOI,
      reviews: poiData,
      rating: totalRatingScore / poiData.length,
      numRatings: poiData.length,
      //=====Begin Fake Data=====
      name: FakeData.moth.name,
      images: FakeData.moth.images,
      accessability: FakeData.moth.accessability,
      description: FakeData.moth.description,
      tags: FakeData.moth.tags
    })
  }


  getAccessibilityIcons = () => {
    if(this.state.accessability === undefined) {
      console.error("Problem getting accessibility icons");
      return;
    }

    let icons = [];
    this.state.accessability.map((accessabilityOption,i) => {
      switch (accessabilityOption) {
        case 'handicap':
          icons.push(
            <i className="fab fa-accessible-icon" key={i}/>
          );
          break;
        case 'bus':
          icons.push(
            <i className="fas fa-bus" key={i}/>
          );
          break;
        default:
          break;
      }
    });
    return icons;
  }

  getTags = () => {
    if(this.state.tags === undefined) {
      console.error("Problem getting tags");
      return;
    }

    return (
      this.state.tags.map((tagName,i) => {
        return (
          <Tag
            name={tagName}
            key={i}
          />
        )
      })
    );
  }

  getReviews = () => {
    if(this.state.reviews === undefined) {
      console.error("Problem getting reviews");
      return;
    }

    return (
      this.state.reviews.map((item,i) => {
        return (
          <Review
            user={this.state.reviews[i].user}
            title={this.state.reviews[i].title}
            body={this.state.reviews[i].body}
            rating={this.state.reviews[i].rating}
            key={i}
          />
        );
      })
    );
  }
  */

  openCloseShareScreen = (nextState) => {
    this.setState({
      shareScreenState: nextState
    })
  }

  setDescriptionScroll = (nextState) => {
    this.setState({
      descriptionScrollState: nextState
    })
  }

  addToList = async() => {
    if(this.props.user.lists.length === 0) {
      //User has no lists, for now lets just make a default list and add poi to it
      this.props.Actions.createList(this.props.user.username,'default',[this.props.poi])
      .then(person => {
        console.log(person);
        console.log('success');
      })
      .catch(err => {
        console.error(err);
      })
    }
    else {
      //user has some number of lists, ask them if they want to add to that one.
      // TODO: This
      console.log(this.props.user.lists);
      this.props.Actions.updateList(this.props.user.lists[0].id,[...this.props.user.lists[0].poilist,this.props.poi])
      .then(person => {
        console.log(person);
        console.log('success');
      })
      .catch(err => {
        console.error(err);
      })
    }
  }

  reportPOI = () => {
    //console.log("Reported POI with id: " + this.state.id);
  }

  handleClick = (btn) => {
    switch (btn) {
      case 'Share':
        this.setState({
          shareButtonClassName: 'poi__lower__button--pressed'
        }, () => {
          setTimeout(() => {this.setState({shareButtonClassName: 'poi__lower__button'})}, 200);
        })
        this.openCloseShareScreen(true);
        break;
      case 'List':
        this.setState({
          listButtonClassName: 'poi__lower__button--pressed'
        }, () => {
          setTimeout(() => {this.setState({listButtonClassName: 'poi__lower__button'})}, 200);
        })
        this.addToList();
        break;
      case 'Review':
        this.setState({
          reviewButtonClassName: 'poi__lower__button--pressed'
        }, () => {
          setTimeout(() => {
            this.setState({reviewButtonClassName: 'poi__lower__button'});
            history.push(routes._REVIEW);
          }, 200);
        })
        break;
      case 'Report':
        this.setState({
          reportButtonClassName: 'poi__lower__button--pressed'
        }, () => {
          setTimeout(() => {this.setState({reportButtonClassName: 'poi__lower__button'})}, 200);
        })
        this.reportPOI();
        break;
      default:

    }
  }

  render () {

    let descriptionStyle = {
        overflowY: this.state.descriptionScrollState
    };
    let poi = this.props.poi;
    if(poi == null) {
      return (
        <div className=''>
          <Redirect to={routes._EXPLORE}/>
        </div>
      )
    }

    return (
      <div className='poiPage'>
        <div className='poi__upper'>
          <h1>{poi.name}</h1>
          <POICarousel
            images={poi.pictures}
            name={poi.name}
          />
        </div>
        <div className='poi__lower'>
          <div>
            <div className='poi__lower__ratingline'>
              <Rating
                number={poi.rating}
              />
            <p>{this.state.numRatings} Ratings</p>
              {/*this.getAccessibilityIcons()*/}
            </div>

            <div className='poi__lower__description'>
              <h4>Description</h4>
              <p
                onMouseEnter={() => this.setDescriptionScroll('auto')}
                onMouseLeave={() => this.setDescriptionScroll('hidden')}
                style={descriptionStyle}
                >
                {poi.description}
              </p>
            </div>

            <div>
              <h4>Tags</h4>
              <div className='poi__lower__tags'>{/*this.getTags()*/}</div>
            </div>

            <div className='poi__lower__reviews'>
              <div className='poi__lower__reviews__line'>
                <h4>Reviews</h4>
                <NavLink
                  className='poi__lower__review__link'
                  activeClassName='is-active'
                  to={routes._REVIEW}>
                  Leave a Review
                </NavLink>
              </div>
              <div id='allReviews'>
                {
                  this.state.reviews.length > 0
                  ?
                  this.state.reviews.map((review,i) => {
                    return (
                      <Review
                        user={review.user}
                        title={review.title}
                        body={review.body}
                        rating={review.rating}
                        key={i}
                      />
                    );
                  })
                  :
                  <p>No Reviews Yet!</p>
                }
              </div>
            </div>
          </div>

          <div className='poi__lower__buttons'>
            <div className='poi__lower__buttons__option'>
              <button
                className={this.state.shareButtonClassName}
                onClick={() => this.handleClick('Share')}>
                <i className="fas fa-share-alt"/>
              </button>
              <p>Share</p>
            </div>

            <div className='poi__lower__buttons__option listBtn'>
              <div>
                <button
                  className={this.state.listButtonClassName}
                  onClick={() => this.handleClick('List')}>
                  <p>+</p>
                </button>
                <p>Add to List</p>
              </div>

              <div className='listAddOptions'>
                <ul>
                  {
                    this.props.user.lists.map((list,i) => {
                      return (
                        <li key={i}>
                          {list.listname}
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </div>

            <div className='poi__lower__buttons__option'>
              <button
                className={this.state.reviewButtonClassName}
                onClick={() => this.handleClick('Review')}>
                <p>T</p>
              </button>
              <p>Review</p>
            </div>

            <div className='poi__lower__buttons__option'>
              <button
                className={this.state.reportButtonClassName}
                onClick={() => this.handleClick('Report')}>
                <i className="fas fa-flag"/>
              </button>
              <p>Report</p>
            </div>
          </div>
        </div>


        <Modal show={this.state.shareScreenState} onHide={() => this.openCloseShareScreen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Share {this.state.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <TwitterShareButton
                url="isucytes.com"
                title="ISU Moth"
                className="Demo__some-network__share-button">
                <TwitterIcon
                  size={32}
                  round />
              </TwitterShareButton>

              <FacebookShareButton
                url="isucytes.com"
                quote="ISU Moth"
                className="Demo__some-network__share-button">
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>

              <RedditShareButton
                url="isucytes.com"
                title="ISU Moth"
                className="Demo__some-network__share-button">
                <RedditIcon
                  size={32}
                  round />
              </RedditShareButton>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.openCloseShareScreen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    poi: state.poi.currPOI,
    user: state.user.currUser
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
)(POI);
