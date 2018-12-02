import React from 'react'
import { ReviewAPI } from '../../api'
import Rating from './rating.js'

const ANON_USER = 'https://cdn4.iconfinder.com/data/icons/danger-soft/512/people_user_business_web_man_person_social-512.png'

class Review extends React.Component {
  state = {
    bodyState: 'hidden'
  };

  setReviewScroll = (nextBodyState) => {
    this.setState({
      bodyState: nextBodyState
    })
  };

  reportReview = async(e) => {
    alert(this.props.id);
    let review = await ReviewAPI.UpdateReview(this.props.id,this.props.rating,this.props.title,this.props.body);
    if(review.error){}
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
        <Rating
          number={this.props.rating}
        />
        <div>
          <button onClick={this.reportReview}>report</button>
        </div>
      </div>
    );
  }
}

export default Review;
