import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import Navagation from '../components/Nav/navagation.js'
import * as Actions from '../actions/actions.js'

const withNav = (Component) => {
  return (
    class WithAuthentication extends React.Component {
      render () {
        return (
          <React.Fragment>
            <Navagation
              pois={this.props.pois}
              user={this.props.user}
              setSelectedPOI={this.props.Actions.setSelectedPOI}
              logoutUser={this.props.Actions.logoutUser}
            />
            <Component {...this.props} />
          </React.Fragment>
        )
      }
    }
  )
}

function mapStateToProps(state) {
  return {
    pois: state.poi.poiList,
    user: state.user.currUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

const composedHoc = compose(
  connect(mapStateToProps,mapDispatchToProps),
  withNav
);

export default composedHoc;
