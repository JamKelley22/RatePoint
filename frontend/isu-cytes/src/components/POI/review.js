import React from 'react'

class Review extends React.Component {
  state = {
    bodyState: 'hidden'
  }

  setReviewScroll = (nextBodyState) => {
    this.setState({
      bodyState: nextBodyState
    })
  }

  render () {
    let bodyStyle = {
      overflowY: this.state.bodyState
    }
    return (
      <div className='review'>
        <div className='review__user'>
          <img className='review__user__pic' src={this.props.user.pic}/>
          <p>{this.props.user.username}</p>
        </div>
        <div className='review__content'>
          <h4>{this.props.title}</h4>
          <p
            onMouseEnter={() => this.setReviewScroll('auto')}
            onMouseLeave={() => this.setReviewScroll('hidden')}
            style={bodyStyle}
            >
            {this.props.body}
          </p>
        </div>
      </div>
    );
  }
}

export default Review;
