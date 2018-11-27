import React from 'react'
import PropTypes from 'prop-types'

class Rating extends React.Component {

  render () {
    let arr = [];
    if(this.props.number !== null) {
      let i;
      let wholeNum = Math.floor(this.props.number);
      let dec = this.props.number % 1;
      for (i = 0; i < wholeNum; i++) {
        arr.push(
          <i className="fas fa-star" key={i}/>
        )
      };
      if(dec === .5) {
        arr.push(
          <i className="fas fa-star-half-alt" key={i}/>
        );
        i++;
      }
      while(i < 5) {
        arr.push(
          <i className="far fa-star" key={i}/>
        )
        i++;
      }
    }
    else {
      //null
      arr = "No Reviews"
    }

    return (
      <div className='rating__stars'>
        {arr}
      </div>
    );
  }
}

export default Rating;
