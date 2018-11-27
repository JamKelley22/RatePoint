import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Rating extends React.Component {

  render () {
    let arr = [];
    if(this.props.number !== null) {
      let i;
      let wholeNum = Math.floor(this.props.number);
      let dec = this.props.number % 1;
      for (i = 0; i < wholeNum; i++) {
        arr.push(
          <FontAwesomeIcon icon="star" key={i}/>
        )
      };
      if(dec === .5) {
        arr.push(
          <FontAwesomeIcon icon="star-half-alt" key={i}/>
        );
        i++;
      }
      while(i < 5) {
        arr.push(
          <FontAwesomeIcon icon={['far', 'star']} key={i}/>
        )
        i++;
      }
    }
    else {
      //null
      arr = <FontAwesomeIcon icon={['fas', 'times']} style={{color: 'red'}}/>
    }

    return (
      <div className='rating__stars'>
        {arr}
      </div>
    );
  }
}

export default Rating;
