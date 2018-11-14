import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import { Redirect } from "react-router-dom";

import { history, routes } from '../history.js'

import './auth.scss'

/*
  When composed with this HOC, the component can only be viewed by user of role >= minimumUserRole
  (0 = user, 1 = mod, 2 = admin);
*/
const withAuthorization = (minimumUserRole) => WrappedComponent => {
  return (
    class WithAuthorization extends React.Component {

      render () {
        return(
          (this.props.user.role >= minimumUserRole)
          ?
          <WrappedComponent {...this.props} />
          :
          <div className='authErrorPage'>
            <h3>User Role: {this.props.user.role}</h3>
            <h1>Error 401</h1>
            <h3>You are Unauthorized to be here 🤖</h3>
            <button onClick={() => history.push(routes._HOME)}>Take Me To Safety</button>
            <button onClick={() => history.goBack()}>Go Back</button>
          </div>
        )
      }
    }
  )
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
    withAuthorization(minimumUserRole)
  );
  composedHoc();
}

export default withAuthorization;
