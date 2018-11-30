import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OverviewCard from './overviewCard.js'
import { withAuthentication, withAuthorization, withNav } from '../../hoc'
import { USER_ROLES } from '../../constants'
import * as Actions from '../../actions/actions.js'

import './moderation.scss'

class Moderation extends React.Component {
  state = {
    unapprovedPOIs: [],
    flaggedPOIs: [],
    flaggedReviews: []
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.filterPOISuggestions();
    this.filterPOIFlags();
    this.filterReviewFlags();
  }

  filterPOISuggestions = () => {
    let unapprovedPOIs = this.props.pois.filter(poi => {
      return !poi.approved;
    })
    this.setState({
      unapprovedPOIs: unapprovedPOIs
    })
  }

  filterPOIFlags = () => {
    // TODO: Impliment this when api has flags
  }

  filterReviewFlags = () => {
    // TODO: Impliment this when api has flags
  }

  approvePOISuggestion = (poi) => {
    //console.log(poi);
    this.props.Actions.approvePOI(poi)
    .then(poi => {
      console.log("Success");
      this.refresh();
    })
    .catch(err => {
      console.error(err);
    })
  }

  rejectPOISuggestion = (poi) => {
    //console.log(poi);
    this.props.Actions.rejectPOI(poi)
    .then(poi => {
      console.log("Success");
      this.refresh();
    })
    .catch(err => {
      console.error(err);
    })
  }

  approvePOIFlag = () => {
    //Delete POI???
  }

  rejectPOIFlag = () => {
    //Remove Flag???
  }

  approveReviewFlag = () => {
    //Delete Review???
  }

  rejectReviewFlag = () => {
    //Remove Flag???
  }

  render () {
    return (
      <div className='moderationPage'>
        <h1>Moderation</h1>
        <div className='modCols'>
          <div className='modCol poiSuggestions'>
            <h2>POI Suggestions</h2>
            <div className='scrollView'>
              {
                this.state.unapprovedPOIs.length > 0
                ?
                this.state.unapprovedPOIs.map((poi,i) => {
                  return (
                    <OverviewCard
                      key={i}
                      cardType='POISuggestion'
                      poi={poi}
                      setSelectedPOI={this.props.Actions.setSelectedPOI}
                      onApprove={() => this.approvePOISuggestion(poi)}
                      onReject={() => this.rejectPOISuggestion(poi)}
                    />
                  )
                })
                :
                <p>All Clear Here <FontAwesomeIcon icon={['far','thumbs-up']}/></p>
              }
            </div>
          </div>

          <div className='modCol flaggedPOIs'>
            <h2>Flagged POIs</h2>
            <div className='scrollView'>
              {
                this.state.flaggedPOIs.length > 0
                ?
                this.state.flaggedPOIs.map(poi => {
                  return (
                    <OverviewCard
                      cardType='FlaggedPOI'
                      poi={poi}
                      onApprove={() => this.approvePOIFlag(poi)}
                      onReject={() => this.rejectPOIFlag(poi)}
                    />
                  )
                })
                :
                <p>All Clear Here <FontAwesomeIcon icon={['far','thumbs-up']}/></p>
              }
            </div>
          </div>

          <div className='modCol flaggedReviews'>
            <h2>Flagged Reviews</h2>
            <div className='scrollView'>
              {
                this.state.flaggedReviews.length > 0
                ?
                this.state.flaggedReviews.map(review => {
                  return (
                    <OverviewCard
                      cardType='FlaggedReview'
                      review={review}
                      onApprove={() => this.approveReviewFlag(review)}
                      onReject={() => this.rejectReviewFlag(review)}
                    />
                  )
                })
                :
                <p>All Clear Here <FontAwesomeIcon icon={['far','thumbs-up']}/></p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pois: state.poi.allPOIs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default compose(
  withNav,
  withAuthorization(USER_ROLES.MOD),
  connect(mapStateToProps,mapDispatchToProps)
)(Moderation);
