import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import { Redirect } from "react-router-dom";

import { history, routes } from '../history.js'

const withAuthentication = (Component) => {
  return (
    class WithAuthentication extends React.Component {
      render () {
        return (
          (this.props.user)
          ?
          <Component {...this.props} />
          :
          <Redirect to={routes._LOGIN}/>
        )
      }
    }
  )
}

function mapStateToProps(state) {
  return {
    user: state.user.currUser
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const composedHoc = compose(
  connect(mapStateToProps,mapDispatchToProps),
  withAuthentication
);

export default composedHoc;
