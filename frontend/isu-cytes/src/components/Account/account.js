import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import to from 'await-to-js';

import { withAuthentication, withNav } from '../../hoc'
import * as Actions from '../../actions/actions.js'
import { history, routes } from '../../history.js'
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
    reviewsError: null,
    fetching: {
      list: null,
      msg: ''
    }
  }

  componentDidMount() {
    this.getUserReviews();
  }

  getUserReviews = async() => {
    let allReviews = await ReviewAPI.GetAllReviews();
    console.log("===");
    console.log(allReviews);
    if(allReviews.error) {
      this.setState({
        reviewsError: allReviews.error
      })
      return;
    }
    let userReviews = allReviews.filter(review =>
      review.author === this.props.user.username
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
    this.props.Actions.updateUser(p.oldUsername,p.newUsername,p.email,p.name,p.biography,p.password,p.role)
    .then(res => {
      console.log(res);
      cb();
    })
    .catch(err => {
      console.error(err);
    })
  }

  deleteList = (list) => {
    this.setState({
      fetching: {
        list: list,
        msg: 'Deleting List...'
      }
    })
    //console.log(list);
    this.props.Actions.deleteList(list.id)
    .then(ret => {
      this.setState({
        fetching: {
          list: null,
          msg: ''
        }
      })
      //console.log("success");
      //console.log(`Deleted List: ${list.listname}`);
    })
    .catch(e => {
      this.setState({
        list: null,
        msg: ''
      })
      console.error(e);
    })
  }

  viewPOI = (poi) => {
    //Update Redux
    this.props.Actions.setSelectedPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  viewPOIByNum = (poiId) => {
    let poi = this.props.pois.find(poi =>
      poi.id === poiId
    )
    //Update Redux
    this.props.Actions.setSelectedPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  getPOIName = (poiId) => {
    let poi = this.props.pois.find(poi =>
      poi.id === poiId
    )
    return poi.name;
  }

  setListName = (list, newName) => {
    this.props.Actions.updateList(list.id,newName,list.poilist)
    .then(ret => {
      console.log("success");
    })
    .catch(e => {
      console.error(e);
    })
  }

  createList = (name) => {
    this.setState({
      fetching: {
        list: null,
        msg: 'New List'
      }
    })
    this.props.Actions.createList(this.props.user.username,name,[])
    .then(ret => {
      this.setState({
        fetching: {
          list: null,
          msg: ''
        }
      })
    })
    .catch(e => {
      this.setState({
        fetching: {
          list: null,
          msg: ''
        }
      })
      console.error(e);
    })
  }

  render () {
    let Tab;

    switch (this.state.openTab) {
      case TABS.LISTS:
        Tab =
        <CurrentUserList
          lists={this.props.user.lists}
          deleteList={this.deleteList}
          viewPOI={this.viewPOI}
          setListName={this.setListName}
          createList={this.createList}
          fetching={this.state.fetching}
          />;
        break;
      case TABS.REVIEWS:
        Tab = <CurrentUserReviews
          reviews={this.state.reviewsFromUser}
          viewPOIByNum={this.viewPOIByNum}
          getPOIName={this.getPOIName}
          />;
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
          <hr/>
          {Tab}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.currUser,
    pois: state.poi.allPOIs
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
