import React from 'react'
import PropTypes from 'prop-types'

import { history, routes } from '../../history.js'

import Rating from '../POI/rating.js'

const POICard = (props) => {
  return (
    <div className='poiCard' onClick={() => history.push(routes._POI)}>
      <h1>{props.title}</h1>
      <img src={props.pic} alt='site'/>
      <Rating
        number={props.rating}
      />
    </div>
  )
}

export default POICard;
