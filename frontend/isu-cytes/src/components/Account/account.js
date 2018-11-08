import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import { withAuthentication, withNav } from '../../hoc'
import * as Actions from '../../actions/actions.js'
import { ReviewAPI, PersonAPI } from '../../api'
import CurrentUserList from './currentUserLists.js'
import CurrentUserReviews from './currentUserReviews.js'
import CurrentUserFriends from './currentUserFriends.js'
import CurrentUserView from './currentUserView.js'

import './account.scss'

const TABS = {
  LISTS: 'Lists',
  REVIEWS: 'Reviews',
  FRIENDS: 'Friends'
}

class Account extends React.Component {
  state = {
    openTab: TABS.LISTS,
    reviewsFromUser: [],
    reviewsError: null
  }

  componentDidMount() {
    this.getUserReviews();
  }

  getUserReviews = async() => {
    let allReviews = await ReviewAPI.GetAllReviews();
    if(allReviews.error) {
      this.setState({
        reviewsError: allReviews.error
      })
      return;
    }
    let userReviews = allReviews.filter(review =>// TODO: Move this to backend (filtering on only review left by userID)
      true
    )
    this.setState({
      reviewsFromUser: userReviews
    })
  }

  switchTab = (newTab) => {
    this.setState({
      openTab: newTab
    })
  }

  updateUser = (p,cb) => {
    this.props.Actions.updateUser(p.oldUsername,p.newUsername,p.email,p.name,p.biography,p.password)
    .then(res => {
      console.log(res);
      cb();
    })
    .catch(err => {
      console.error(err);
    })
  }

  render () {
    let Tab;

    switch (this.state.openTab) {
      case TABS.LISTS:
        Tab = <CurrentUserList />;
        break;
      case TABS.REVIEWS:
        Tab = <CurrentUserReviews />;
        break;
      case TABS.FRIENDS:
        Tab = <CurrentUserFriends />;
        break;
      default:
        Tab = <div>Empty</div>

    }
    return (
      <div className='accountPage'>
        <CurrentUserView
          editingProfile={this.state.editingProfile}
          setEditingProfile={this.setEditingProfile}

          id={this.props.user.id}
          username={this.props.user.username}
          name={this.props.user.name}
          email={this.props.user.email}
          biography={this.props.user.biography}
          role={this.props.user.role}
          /*pic={this.props.user.pic}*/
          updateUser={this.updateUser}
          />

        <div className='accountContent'>
          <div className='accountTabs'>
            <button className={`accountTab ${this.state.openTab === TABS.LISTS && 'activeTab'}`} onClick={() => this.switchTab(TABS.LISTS)}>{TABS.LISTS}</button>
            <button className={`accountTab ${this.state.openTab === TABS.REVIEWS && 'activeTab'}`} onClick={() => this.switchTab(TABS.REVIEWS)}>{TABS.REVIEWS}</button>
            {/*<button className={`accountTab ${this.state.openTab === TABS.FRIENDS && 'activeTab'}`} onClick={() => this.switchTab(TABS.FRIENDS)}>{TABS.FRIENDS}</button>*/}
          </div>
          {Tab}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.currUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default compose(
  withNav,
  withAuthentication,
  connect(mapStateToProps,mapDispatchToProps)
)(Account);
