import React, { Component } from 'react';
import { Router,Route,Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import library from './icons.js'

import { Landing,Home,Map,Explore,Friends,Suggest,Account,
  Review,POI,Error404,Login,CreateAccount,Moderation,Search,ViewUser,APIPage } from './components'

import { history } from './history.js'
import * as routes from './constants/routes'
import { POIAPI, RatePointWebSocket } from './api'
import * as Actions from './actions/actions.js'

import './App.scss'

/*
//Make it so user has to confirm page close (which then logs them out)
window.onbeforeunload = function() {
  //Not
  Actions.logoutUser();
  RatePointWebSocket.closeWebsocket();
  return true;
};
*/

class App extends Component {

  componentDidMount() {
    this.cachePOIs();
  }

  cachePOIs = async() => {
    let pois = await POIAPI.GetPOIs();
    let newPOIs = await this.getPOIsWithRatings(pois);
    this.props.Actions.setAllPOIs(newPOIs);
  }

  getPOIsWithRatings = async(pois) => {
    let newPOIs = [];
    for(var i = 0; i < pois.length; i++) {
      let rating = await POIAPI.GetPOIRating(pois[i].id);
      let newPOI = pois[i];
      newPOI.rating = (rating.average) ? rating.average : null;
      newPOIs.push(newPOI);
    }
    return newPOIs;
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path={routes._LANDING} component={() => <Landing/>} />
            <Route exact path={routes._HOME} component={() => <Home/>} />
            <Route exact path={routes._MAP} component={() => <Map/>} />
            <Route exact path={routes._EXPLORE} component={() => <Explore/>} />
            <Route exact path={routes._FRIENDS} component={() => <Friends/>} />
            <Route exact path={routes._SUGGEST} component={() => <Suggest/>} />
            <Route exact path={routes._ACCOUNT} component={() => <Account/>} />
            <Route exact path={routes._LOGIN} component={() => <Login/>} />
            <Route exact path={routes._CREATEACCOUNT} component={() => <CreateAccount/>} />
            <Route exact path={routes._REVIEW} component={() => <Review/>} />
            <Route exact path={routes._POI} component={() => <POI/>} />
            <Route exact path={routes._MODERATION} component={() => <Moderation/>} />
            <Route exact path={routes._SEARCH} component={() => <Search/>} />
            <Route exact path={routes._VIEWUSER} component={() => <ViewUser/>} />
            <Route exact path={routes._API} component={() => <APIPage/>} />
            <Route component={() => <Error404/>} />
          </Switch>
        </div>
      </Router>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


//Empty
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1"><defs><style>.a{fill:#820000;stroke:#707070;}</style></defs><path class="a" d="M0,0H0Z" transform="translate(0 0.5)"/></svg>
//Middle
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1"><defs><style>.a{fill:#820000;stroke:#707070;}</style></defs><path class="a" d="M0,0H0Z" transform="translate(0 0.5)"/></svg>
//End
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1921.349 565.545"><defs><style>.a{fill:#820000;stroke:#707070;}</style></defs><path class="a" d="M0,0S152.727,526.364,327.273,526.364,433.93,343.636,600,343.636s425.114,220.909,600,220.909,163.636-220.909,387.273-220.909S1920,0,1920,0Z" transform="translate(0.666 0.5)"/></svg>
