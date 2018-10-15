import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';

<<<<<<< HEAD
import Landing from './components/Landing/landing.js';

import Home from './components/Home/home.js';
import Map from './components/Map/map.js';
import Explore from './components/Explore/explore.js';
import Friends from './components/Friends/friends.js';
import Suggest from './components/Suggest/suggest.js';
import Account from './components/Account/account.js';
import Login from './components/Login/login.js';
import CreateAccount from './components/CreateAccount/createAccount.js';
import Review from './components/Review/review.js';
import POI from './components/POI/poi.js';
import Error404 from './components/Error/error404.js';

//import { Landing, Home, Map, Explore, Friends, Suggest, Account, Review, POI, Error404 } from './components'
=======
import {
  Landing,
  Home,
  Map,
  Explore,
  Friends,
  Suggest,
  Account,
  Review,
  POI,
  Error404,
  Login,
  CreateAccount} from './components'
>>>>>>> 9e74b1a5b871523d10dddee81ebb7bee030eda85
import { history } from './history.js';

import * as routes from './constants/routes';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faTrophy, faClock, faCar } from '@fortawesome/free-solid-svg-icons'

import './App.scss';

library.add(faThumbsUp, faTrophy, faClock, faCar);

class App extends Component {
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
            <Route component={() => <Error404/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
