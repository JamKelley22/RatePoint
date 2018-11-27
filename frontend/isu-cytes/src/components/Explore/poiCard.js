import React from 'react'
import PropTypes from 'prop-types'

import Rating from '../POI/rating.js'

const POICard = (props) => {
  console.log(props.rating);
  return (
    <div className={'poiContainer animated pulse'} style={{animationDelay: `${props.delay}s`}}>
      <div className='poiCard' onClick={props.onClick}>
        <div className='poiCardImg'>
          <img src={props.pic} alt='site'/>
        </div>
        <div className='poiCardRating'>
          <p>{props.title}</p>
          <Rating
            number={props.rating}
          />
        </div>
      </div>
    </div>
  )
}

export default POICard;

POICard.propTypes = {
  title: PropTypes.string,
  pic: PropTypes.string,
  rating: PropTypes.number
}

POICard.defaultProps = {
  title: 'POI Title',
  pic: 'https://cdn.browshot.com/static/images/not-found.png',
  rating: 0
}
