import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';

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
  CreateAccount,
  APIPage
} from './components'
import { history } from './history.js';

import * as routes from './constants/routes';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faTrophy, faClock, faCar, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import './App.scss';

library.add(faThumbsUp, faTrophy, faClock, faCar, faCaretDown);

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
            <Route exact path={routes._API} component={() => <APIPage/>} />
            <Route component={() => <Error404/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

//<Route exact path={routes._API} component={() => <API/>} />
