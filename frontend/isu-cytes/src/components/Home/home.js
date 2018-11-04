import React from 'react'
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { withAuthentication, withNav } from '../../hoc'
import * as Actions from '../../actions/actions.js'
import { history, routes } from '../../history.js'

import './home.scss'

class Home extends React.Component {

  onUserClick = (username) => {
    this.props.Actions.getSetSelectedUserByUsername(username)
    .then(res => {
      console.log("success");
      console.log(res);
      history.push(routes._VIEWUSER)
    })
    .catch(err => {
      console.error(err);
    })
  }

  render () {
    let OnlineUserList = (
      <React.Fragment>
        {this.props.onlineusers.map((username,i) =>
          <div
            className='onlineUser'
            key={i}>
            <a
              onClick={() => this.onUserClick(username)}>
              Username: {username}
            </a>
          </div>
        )}
      </React.Fragment>
    )

    return (
      <div className='homePage'>
        <h1>Home</h1>
        <h2>Online Users</h2>
        <div className='onlineUserList'>
          { this.props.currUser && OnlineUserList }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currUser: state.user.currUser,
    onlineusers: state.user.onlineusers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default compose(
  withAuthentication,
  withNav,
  connect(mapStateToProps,mapDispatchToProps)
)(Home);
