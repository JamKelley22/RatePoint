import React from 'react'

import './poi.scss'

class POICarousel extends React.Component {
  state = {
    currMainPicNum: 0,
    leftPic: undefined,
    rightPic: undefined,
    centerPic: undefined
  }

  componentDidMount = () => {
    this.updatePics(this.props.images);
  }

/*
  componentWillReceiveProps = (nextProps) => {
    this.updatePics(nextProps.images);
  }
*/
  updatePics = (images) => {
    console.log(images);
    if(this.props.images === undefined) {
      console.error("Problem loading images");
      return;
    }
    switch (this.props.images.length) {
      case 0:
        console.log("0");
        break;
      case 1:
        console.log("1");
        this.setState({
          leftPic: this.props.images[0],
          centerPic: this.props.images[0],
          rightPic: this.props.images[0],
        })
        break;
      case 2:
        console.log("2");
        this.setState({
          leftPic: this.props.images[1],
          centerPic: this.props.images[0],
          rightPic: this.props.images[1],
        })
        break;
      case 3:
        console.log("3");
        this.setState({
          leftPic: this.props.images[1],
          centerPic: this.props.images[0],
          rightPic: this.props.images[2],
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
