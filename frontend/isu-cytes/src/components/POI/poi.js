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

import * as routes from '../../constants/routes.js'

import Navagation from '../Nav/navagation.js'
import POICarousel from './poiCarousel.js'
import Rating from './rating.js'
import Tag from './tag.js'
import Review from './review.js'

import Moth from '../../images/moth.jpg';

import './poi.css'

class POI extends React.Component {
  state = {
    id: undefined,
    name: '',
    images: [],
    rating: 0,
    numRatings: 0,
    accessability: [],
    description: '',
    tags: [],
    reviews: [],

    shareScreenState: false,
    descriptionScrollState: 'hidden',
    shareButtonClassName: 'poi__lower__button',
    listButtonClassName: 'poi__lower__button',
    reviewButtonClassName: 'poi__lower__button',
    reportButtonClassName: 'poi__lower__button'
  }

  componentDidMount() {
    this.fetchDataFromServer();
    /*
    this.setState({
      id: 1111,
      name: 'The Coover Moth',
      images: [Moth,Moth,Moth],
      rating: 4,
      numRatings: 10,
      accessability: ['handicap', 'bus'],
      description: 'The sculpture outside of coover, walk around it to see the moth. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sagittis velit vitae felis sagittis, vitae vestibulum justo placerat. Proin et nibh id purus consequat interdum pharetra ut mi. ',
      tags: ['Art', 'Outside'],
      reviews: [
        {
          user: {
            username: 'John Doe',
            pic: Moth
          },
          title: 'Test Review',
          body: 'Vestibulum dignissim ante ultricies, iaculis ipsum a, ullamcorper mi. Maecenas maximus varius augue et eleifend. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed convallis mauris, sit amet varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum metus diam, commodo et cursus in.',
          rating: 5
        },
        {
          user: {
            username: 'Jane Doe',
            pic: Moth
          },
          title: 'Test Review2',
          body: 'This place is ok...',
          rating: 3
        }
      ]
    })
    */
  }

  fetchDataFromServer = async() => {
    let response = await fetch('http://localhost:3004/moth');
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    //console.log(data);
    this.setState({
      id: data.id,
      name: data.name,
      images: data.images,
      rating: data.rating,
      numRatings: data.numRatings,
      accessability: data.accessability,
      description: data.description,
      tages: data.tags,
      reviews: data.reviews
    })
  }

  getAccessibilityIcons = () => {
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

  addToList = () => {
    console.log("Add POI with id: " + this.state.id + " to list");
  }

  reportPOI = () => {
    console.log("Reported POI with id: " + this.state.id);
  }

  handleClick = (btn) => {
    switch (btn) {
      case 'Share':
        console.log('Clicked Share Btn');
        this.setState({
          shareButtonClassName: 'poi__lower__button--pressed'
        }, () => {
          setTimeout(() => {this.setState({shareButtonClassName: 'poi__lower__button'})}, 200);
        })
        this.openCloseShareScreen(true);
        break;
      case 'List':
        console.log('Clicked List Btn');
        this.setState({
          listButtonClassName: 'poi__lower__button--pressed'
        }, () => {
          setTimeout(() => {this.setState({listButtonClassName: 'poi__lower__button'})}, 200);
        })
        this.addToList();
        break;
      case 'Review':
        console.log('Clicked Review Btn');
        this.setState({
          reviewButtonClassName: 'poi__lower__button--pressed'
        }, () => {
          setTimeout(() => {this.setState({reviewButtonClassName: 'poi__lower__button'})}, 200);
        })
        break;
      case 'Report':
        console.log('Clicked Report Btn');
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

    return (
      <div className='poiPage'>
        <Navagation className='navagation'/>
        <div className='poi__upper'>
          <h1>{this.state.name}</h1>
          <POICarousel
            images={this.state.images}
            name={this.state.name}
          />
        </div>
        <div className='poi__lower'>
          <div>
            <div className='poi__lower__ratingline'>
              <Rating
                number={this.state.rating}
              />
              <p>{this.state.numRatings} Ratings</p>
              {this.getAccessibilityIcons()}
            </div>

            <div className='poi__lower__description'>
              <h4>Description</h4>
              <p
                onMouseEnter={() => this.setDescriptionScroll('auto')}
                onMouseLeave={() => this.setDescriptionScroll('hidden')}
                style={descriptionStyle}
                >
                {this.state.description}
              </p>
            </div>

            <div>
              <h4>Tags</h4>
              <div className='poi__lower__tags'>{this.getTags()}</div>
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
                {this.getReviews()}
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

            <div className='poi__lower__buttons__option'>
              <button
                className={this.state.listButtonClassName}
                onClick={() => this.handleClick('List')}>
                <p>+</p>
              </button>
              <p>Add to List</p>
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

export default POI;
