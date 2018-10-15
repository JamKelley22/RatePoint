import React from 'react'
import PropTypes from 'prop-types'

const Feature = (props) => {
  return (
    <div className='feature'>
      <div className='icon'>
        {props.icon}
      </div>
      <div className='infoRight'>
        <div className='title'>
          {props.title}
        </div>
        <div className='body'>
          {props.body}
        </div>
      </div>
    </div>
  )
}

export default Feature;

Feature.propTypes = {

};

Feature.defaultProps = {

};
