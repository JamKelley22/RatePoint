import React from 'react'
import PropTypes from 'prop-types'

import Rating from '../POI/rating.js'

const POICard = (props) => {
  let pic = props.pic;
  if(pic !== null) {
    pic = props.pic.split(',')[0];//Grab first one
    if(pic.slice(0,5) !== 'https') {//should always be at least this long
      pic = `https://i.imgur.com/${pic}`;
    }
  }
  if(props.size === 'small') {
    return (
      <div className={'poiContainerSmall'}>
        <div className='poiCardSmall'>
          <div className='poiCardImgSmall'>
            <img src={pic} alt='site'/>
          </div>
          <h3>{props.title}</h3>
          <div className='poiCardRating'>
            <Rating
              number={props.rating}
            />
          </div>
          <a onClick={props.onClick}>View</a>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className={'poiContainer animated pulse'} style={{animationDelay: `${props.delay}s`}}>
        <div className='poiCard' onClick={props.onClick}>
          <div className='poiCardImg'>
            <img src={pic} alt='site'/>
          </div>
          <h3>{props.title}</h3>
          <div className='poiCardRating'>
            <Rating
              number={props.rating}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default POICard;

POICard.propTypes = {
  title: PropTypes.string,
  pic: PropTypes.string,
  rating: PropTypes.string
}

POICard.defaultProps = {
  title: 'POI Title',
  pic: 'https://cdn.browshot.com/static/images/not-found.png',
  rating: "0"
}
