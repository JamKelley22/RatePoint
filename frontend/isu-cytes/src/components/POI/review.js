import React from 'react'
import { ReviewAPI } from '../../api'
import Rating from './rating.js'

const ANON_USER = 'http://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png'

class Review extends React.Component {
  state = {
    bodyState: 'hidden',
    reported: false
  };

  setReviewScroll = (nextBodyState) => {
    this.setState({
      bodyState: nextBodyState
    })
  };

  reportReview = async(e) => {
    let review = await ReviewAPI.UpdateReview(this.props.id,this.props.rating,this.props.title,this.props.body,true);
    if(review.error){}
    this.setState({reported:true});
  };

  render () {
    let bodyStyle = {
      overflowY: this.state.bodyState
    };
    return (
      <div className='review'>
        {
          this.props.user &&
          <div className='review__user'>
            {
              (this.props.user.pic === null) ?
              <img className='review__user__pic' src={this.props.user.pic}/>
              :
              <img className='review__user__pic' src={ANON_USER}/>
            }
            <p>{this.props.user.username}</p>
          </div>
        }
        {
          !this.props.user
          &&
          <div className='review__user'>
            <img className='review__user__pic' src={ANON_USER}/>
            <p>Anonymous</p>
          </div>
        }
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
        <div className='rightReview'>
          <Rating
            number={this.props.rating}
          />
          <div>
              {
                  (this.state.reported) ?
                      <p>reported</p>
                      :
                      <a onClick={this.reportReview}>report</a>
              }
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
