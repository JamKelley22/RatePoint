import React from 'react'
import PropTypes from 'prop-types'

import Rating from '../POI/rating.js'

const POICard = (props) => {
  return (
    <div className={'poiContainer animated bounceInDown'} style={{animationDelay: `${props.delay}s`}}>
      <div className='poiCard' onClick={props.onClick}>
        <h1>{props.title}</h1>
        <div className='poiCardImg'>
          <img src={props.pic} alt='site'/>
        </div>
        <div className='poiCardRating'>
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
