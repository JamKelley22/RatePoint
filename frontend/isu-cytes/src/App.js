import React, { Component } from 'react';
import { Router,Route,Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faTrophy, faClock, faCar, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { Landing,Home,Map,Explore,Friends,Suggest,Account,
  Review,POI,Error404,Login,CreateAccount,APIPage } from './components'
import { history } from './history.js'
import * as routes from './constants/routes'
import { POIAPI, RatePointWebSocket } from './api'
import * as Actions from './actions/actions.js'

import './App.scss'

library.add(faThumbsUp, faTrophy, faClock, faCar, faCaretDown)

class App extends Component {

  componentDidMount() {
    this.cachePOIs();
    //RatePointWebSocket.connect("JoeMama")
  }

  cachePOIs = async() => {
    let pois = await POIAPI.GetPOIs();
    let newPOIs = await this.getPOIsWithRatings(pois);
    this.props.Actions.setAllPOIs(newPOIs);
  }

  getPOIsWithRatings = async(pois) => {
    let newPOIs = [];
    for(var i = 0; i < pois.length; i++) {
      let rating = await POIAPI.GetPOIRating(pois[i].id)
      let newPOI = pois[i];
      newPOI.rating = rating.averageRating
      newPOIs.push(newPOI)
    }
    return newPOIs;
  }

  render() {
    let OnlineUserList = (
      <div className='onlineUserList'>
        {this.props.onlineusers.map((user,i) =>
          <div className='onlineUser' key={i}>
            {user}
          </div>
        )}
      </div>
    )
    console.log(this.props.onlineusers);

    return (
      <Router history={history}>
        <div className="App">
          { this.props.currUser && OnlineUserList }
          <Switch>
            <Route exact path={routes._LANDING} component={() => <Landing/>} />
            <Route exact path={routes._HOME} component={() => <Home/>} />
            <Route exact path={routes._MAP} component={() => <Map/>} />
            <Route exact path={routes._EXPLORE} component={() => <Explore refreshPOIs={this.cachePOIs}/>} />
            <Route exact path={routes._FRIENDS} component={() => <Friends/>} />
            <Route exact path={routes._SUGGEST} component={() => <Suggest/>} />
            <Route exact path={routes._ACCOUNT} component={() => <Account/>} />
            <Route exact path={routes._LOGIN} component={() => <Login/>} />
            <Route exact path={routes._CREATEACCOUNT} component={() => <CreateAccount/>} />
            <Route exact path={routes._REVIEW} component={() => <Review/>} />
            <Route exact path={routes._POI} component={() => <POI/>} />
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
