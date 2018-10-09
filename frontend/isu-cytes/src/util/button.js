import React from 'react'
import PropTypes from 'prop-types'

import './util.scss'

const Button = (props) => {
  let btn;
  let isSquare = (props.square) ? 'square' : '';

  switch (props.size) {
    case 'small':
      btn = (
        <button
        onClick={props.onClick}
        className={`button buttonSmall ${isSquare}`}>
          <span
          className='buttonText'>
            {props.children || props.name}
          </span>
        </button>
      )
      break;
    case 'medium':
      btn = (
        <button
        onClick={props.onClick}
        className={`button buttonMedium ${isSquare}`}>
          <span
          className='buttonText'>
            {props.children || props.name}
          </span>
        </button>
      )
      break;
    case 'large':
      btn = (
        <button
          onClick={props.onClick}
          className={`button buttonLarge ${isSquare}`}>
            <span
            className='buttonText'>
              {props.children || props.name}
            </span>
        </button>
      )
      break;
    default:
      btn = (
        <button
          onClick={props.onClick}
          className={`button ${isSquare}`}>
            <span
            className='buttonText'>
              {props.children || props.name}
            </span>
        </button>
      )
      console.warn("Unknown Button Size: " + props.size);
  }

  return (
    btn
  );
}

export default Button;

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  square: PropTypes.bool
};

Button.defaultProps = {
  name: 'Click Me',
  onClick: () => console.warn("Buttons need an onClick prop function!"),
  size: 'medium',
  square: false
};
