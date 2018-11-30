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
    rejectCheckeed: false
  }

  submitPOIChange = () => {
    if(this.state.approve === null)
      return;

    if(this.state.approve) {
      this.props.onApprove();
    }
    else {
      this.props.onReject();
    }
  }

  viewPOI = () => {
    this.props.setSelectedPOI(this.props.poi);
    history.push(routes._POI);
  }

  render () {
    let cardTop;
    switch (this.props.cardType) {
      case CARD_TYPES.POI_SUGGESTION:
        cardTop = POISuggestOverview(this.props.poi)
        break;
      case CARD_TYPES.FLAGGED_POI:
        cardTop = POIFlaggedOverview(this.props.poi)
        break;
      case CARD_TYPES.FLAGGED_REVIEW:
        cardTop = POISuggestOverview(this.props.review)
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

        <div className='modDecisionBox'>
          <form onSubmit={e => e.preventDefault()}>
            <div className='modDecisionBoxRadios'>
              <div>
                <input
                {...approveInputProps}>
                </input>
                <label>Approve</label>
              </div>

              <div>
                <input
                {...rejectInputProps}>
                </input>
                <label>Reject</label>
              </div>
            </div>
          </form>
        </div>
        <div className='overviewCardBtns'>
          <a className='modViewPOIBtn' onClick={this.viewPOI}>View</a>
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

const POIFlaggedOverview = (poi) =>
  <div className='cardTitle'>
    {poi.name}
  </div>

const FlaggedReviewOverview = (review) =>
  <div className='cardTitle'>
    FlaggedReviewOverview
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
