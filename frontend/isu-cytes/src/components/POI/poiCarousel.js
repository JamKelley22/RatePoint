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

  componentDidUpdate(prevProps) {
    if (this.props.images !== prevProps.images) {
      this.updatePics(this.props.images);
    }
  }

/*
  componentWillReceiveProps = (nextProps) => {
    this.updatePics(nextProps.images);
  }
*/
  updatePics = (images) => {
    if(this.props.images === null) {
      console.error("Problem loading images");
      this.setState({
        leftPic: null,
        centerPic: null,
        rightPic: null,
      })
      return;
    }
    let imgList = this.props.images.split(',').map(img => {
      let pic = img;
      if(img.slice(0,5) !== 'https') {//should always be at least this long
        pic = `https://i.imgur.com/${img}`;
      }
      return pic;
    })

    switch (imgList.length) {
      case 0:
        break;
      case 1:
        this.setState({
          leftPic: imgList[0],
          centerPic: imgList[0],
          rightPic: imgList[0],
        })
        break;
      case 2:
        this.setState({
          leftPic: imgList[1],
          centerPic: imgList[0],
          rightPic: imgList[1],
        })
        break;
      case 3:
        this.setState({
          leftPic: imgList[1],
          centerPic: imgList[0],
          rightPic: imgList[2],
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
