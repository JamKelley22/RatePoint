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
    console.log(this.props.onlineusers);
    let OnlineUserList = [];

    this.props.onlineusers.map((username,i) => {
      if(username !== this.props.currUser.username) {
        OnlineUserList.push(
          <div
            className='onlineUser'
            key={i}>
            Username: {username}
            <a
              onClick={() => this.onUserClick(username)}>
              View
            </a>
          </div>
          )
        }
      }
    )

    console.log(OnlineUserList);

    return (
      <div className='homePage'>
        <h1>Home</h1>
        <h2>Online Users</h2>
        <div className='onlineUserList'>
          <h3>Me</h3>
          <hr/>
          <div
            className='onlineUser'>
            {this.props.currUser.username}
            <a
              onClick={() => history.push(routes._ACCOUNT)}>
              View
            </a>
          </div>
          {
            OnlineUserList.length > 0
            ?
            <React.Fragment>
              <h3>Others</h3>
              <hr/>
              {OnlineUserList}
            </React.Fragment>
            :
            ''
          }
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
