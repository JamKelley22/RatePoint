import React from 'react'

import './poi.css'

class POICarousel extends React.Component {
  state = {
    currMainPicNum: 0,
    leftPic: undefined,
    rightPic: undefined,
    centerPic: undefined
  }

  componentWillReceiveProps = (nextProps) => {
    switch (nextProps.images.length) {
      case 0:
        console.log("0");
        break;
      case 1:
        console.log("1");
        this.setState({
          leftPic: nextProps.images[0],
          centerPic: nextProps.images[0],
          rightPic: nextProps.images[0],
        })
        break;
      case 2:
        console.log("2");
        this.setState({
          leftPic: nextProps.images[1],
          centerPic: nextProps.images[0],
          rightPic: nextProps.images[1],
        })
        break;
      case 3:
        console.log("3");
        this.setState({
          leftPic: nextProps.images[1],
          centerPic: nextProps.images[0],
          rightPic: nextProps.images[2],
        })
        break;
      default:

    }
  }

  render () {
    return (
      <div className='carousel'>
        <img
          src={this.state.leftPic}
          alt={this.props.name}
          className='carousel__pic'
          id={'carousel__left'}
        />
        <img
          src={this.state.centerPic}
          alt={this.props.name}
          className='carousel__pic'
          id={'carousel__center'}
        />
        <img
          src={this.state.rightPic}
          alt={this.props.name}
          className='carousel__pic'
          id={'carousel__right'}
        />
      </div>
    );
  }
}

export default POICarousel;

/*
<div className='carousel'>
  {
    this.props.images.map((im, i) => {
      return (
        <img
          src={im}
          alt={this.props.name}
          key={i}
          style={{width: "200px"}}
          className='carousel__pic'
          id={(this.state.currMainPicNum == i) ? 'carousel__main':'carousel__other'}
        />
      )
    })
  }
</div>
*/
