import React from 'react'
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { withAuthentication, withNav } from '../../hoc'
import * as Actions from '../../actions/actions.js'
import { history, routes } from '../../history.js'
import OnlineUsers from './onlineUsers.js'
import Feed from './feed.js'

import './home.scss'

class Home extends React.Component {

  onUserClick = (username) => {
    this.props.Actions.getSetSelectedUserByUsername(username)
    .then(res => {
      console.log("success");
      history.push(routes._VIEWUSER)
    })
    .catch(err => {
      console.error(err);
    })
  }

  render () {
    return (
      <div className='homePage'>
        <h1>Home</h1>
        <div className='homePage__elements'>
          <div className='homePage__element'>
            <OnlineUsers
              me={this.props.currUser}
              onlineUserList={this.props.onlineusers}
              onUserClick={this.onUserClick}
            />
          </div>
          <div className='homePage__element'>
            <Feed
              poiList={[]}
              peopleList={[]}
              reviewList={[]}
            />
          </div>
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
