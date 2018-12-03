import React from 'react'
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { withAuthentication, withNav } from '../../hoc'
import * as Actions from '../../actions/actions.js'
import { history, routes } from '../../history.js'
import OnlineUsers from './onlineUsers.js'
import Feed from './feed.js'
import { PersonAPI, ReviewAPI } from '../../api/'

import './home.scss'

class Home extends React.Component {
  state = {
    allPeople: [],
    allReviews: []
  }

  componentDidMount = async() => {
    let allPeople = await PersonAPI.GetAllPersons();
    let allReviews = await ReviewAPI.GetAllReviews();
    this.setState({
      allPeople: allPeople,
      allReviews: allReviews
    })
  }

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

  viewPOIByNum = (poiId) => {
    let poi = this.props.pois.find(poi =>
      poi.id === poiId
    )
    //Update Redux
    this.props.Actions.setSelectedPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  render () {
    return (
      <div className='homePage'>
        <div className='homePage__elements'>
          <div>
            <OnlineUsers
              me={this.props.currUser}
              onlineUserList={this.props.onlineusers}
              onUserClick={this.onUserClick}
            />
          </div>
          <div className='homePage__element'>
            <Feed
              poiList={this.props.pois}
              peopleList={this.state.allPeople}
              reviewList={this.state.allReviews}
              setSelectedPOI={this.props.Actions.setSelectedPOI}
              onUserClick={this.onUserClick}
              viewPOIByNum={this.viewPOIByNum}
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
    onlineusers: state.user.onlineusers,
    pois: state.poi.allPOIs
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
