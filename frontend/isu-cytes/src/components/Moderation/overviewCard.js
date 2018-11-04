import React from 'react'
import PropTypes from 'prop-types'

const CARD_TYPES = {
  POI_SUGGESTION: 'POISuggestion',
  FLAGGED_POI: 'FlaggedPOI',
  FLAGGED_REVIEW: 'FlaggedReview'
}

class OverviewCard extends React.Component {
  state = {
    disabled: false
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
      type:"checkbox",
      disabled: this.state.disabled,
      onClick: () => {
        this.setState({
          disabled: true
        })
        this.props.onApprove();
      }
    };

    let rejectInputProps = {
      type:"checkbox",
      disabled: this.state.disabled,
      onClick: () => {
        this.setState({
          disabled: true
        })
        this.props.onReject();
      }
    };
    return (
      <div className='overviewCard'>
        {cardTop}

        <div className='modDecisionBox'>
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
      </div>
    )
  }
}

const POISuggestOverview = (poi) =>
  <div>
    {poi.name}
  </div>

const POIFlaggedOverview = (poi) =>
  <div>
    {poi.name}
  </div>

const FlaggedReviewOverview = (review) =>
  <div>
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
