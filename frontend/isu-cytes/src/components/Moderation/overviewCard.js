import React from 'react'
import PropTypes from 'prop-types'
import { history, routes } from '../../history.js'

const CARD_TYPES = {
  POI_SUGGESTION: 'POISuggestion',
  FLAGGED_POI: 'FlaggedPOI',
  FLAGGED_REVIEW: 'FlaggedReview'
}

class OverviewCard extends React.Component {
  state = {
    approve: null,
    approvedChecked: false,
    rejectCheckeed: false,
    reviewOpen: false
  }

  submitPOIChange = () => {
    if(this.state.approve === null)
      return;

    if(this.state.approve) {
      this.props.onApprove();
      this.setState({
        approvedChecked: false,
        rejectCheckeed: false
      })
    }
    else {
      this.props.onReject();
      this.setState({
        approvedChecked: false,
        rejectCheckeed: false
      })
    }
  }

  viewPOI = () => {
    this.props.setSelectedPOI(this.props.poi);
    history.push(routes._POI);
  }

  toggleReview = () => {
    this.setState({
      reviewOpen: !this.state.reviewOpen
    })
  }

  render () {
    let cardTop;
    let viewOption;
    let approveLabel;
    let rejectLabel;
    switch (this.props.cardType) {
      case CARD_TYPES.POI_SUGGESTION:
        cardTop = POISuggestOverview(this.props.poi);
        viewOption = <a className='modViewPOIBtn' onClick={this.viewPOI}>View</a>
        approveLabel = <label>Approve</label>;
        rejectLabel = <label>Reject</label>;
        break;
      case CARD_TYPES.FLAGGED_REVIEW:
        cardTop = FlaggedReviewOverview(this.props.review);
        viewOption = <a className='modViewPOIBtn' onClick={this.toggleReview}>{this.state.reviewOpen ? 'Close' : 'View'}</a>
        approveLabel = <label>Delete</label>;
        rejectLabel = <label>Remove Flag</label>;
        break;
      default:
        cardTop = (
          <div>
            Invalid Card Type
          </div>
        )
    }
    let approveInputProps = {
      type:"radio",
      checked: this.state.approvedChecked,
      onClick: () => {
        this.setState({
          approve: true,
          approvedChecked: true,
          rejectCheckeed: false
        })
      }
    };

    let rejectInputProps = {
      type:"radio",
      checked: this.state.rejectCheckeed,
      onClick: () => {
        this.setState({
          approve: false,
          approvedChecked: false,
          rejectCheckeed: true
        })
      }
    };
    return (
      <div className='overviewCard'>
        {cardTop}
        <hr/>
        {
          this.state.reviewOpen
          &&
          <React.Fragment>
            {this.props.review.body}
            <hr/>
          </React.Fragment>
        }

        <div className='modDecisionBox'>
          <form onSubmit={e => e.preventDefault()}>
            <div className='modDecisionBoxRadios'>
              <div>
                <input
                {...approveInputProps}>
                </input>
                {approveLabel}
              </div>

              <div>
                <input
                {...rejectInputProps}>
                </input>
                {rejectLabel}
              </div>
            </div>
          </form>
        </div>
        <div className='overviewCardBtns'>
          {viewOption}
          <button className='modViewPOIBtn' onClick={this.submitPOIChange}>Submit</button>
        </div>
      </div>
    )
  }
}

const POISuggestOverview = (poi) =>
  <div className='cardTitle'>
    {poi.name}
  </div>

const FlaggedReviewOverview = (review) =>
  <div className='cardTitle'>
    {review.title}
  </div>

export default OverviewCard;

OverviewCard.propTypes = {
  cardType: PropTypes.oneOf([CARD_TYPES.POI_SUGGESTION, CARD_TYPES.FLAGGED_POI, CARD_TYPES.FLAGGED_REVIEW]),
  onApprove: PropTypes.func,
  onReject: PropTypes.func
};

OverviewCard.defaultProps = {
  cardType: CARD_TYPES.POI_SUGGESTION,
  onApprove: () => console.log('On Approve'),
  onReject: () => console.log('On Reject')
};
