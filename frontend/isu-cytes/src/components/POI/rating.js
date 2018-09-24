import React from 'react'
import PropTypes from 'prop-types'

class Rating extends React.Component {

  render () {
    let arr = [];
    let i;
    for (i = 0; i < this.props.number; i++) {
      arr.push(
        <i className="fas fa-star" key={i}/>
      )
    };
    while(i < 5) {
      arr.push(
        <i className="far fa-star" key={i}/>
      )
      i++;
    }

    return (
      <div className='rating__stars'>
        {arr}
      </div>
    );
  }
}

export default Rating;
