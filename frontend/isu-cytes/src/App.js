import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Landing from './components/Landing/landing.js';
import Review from './components/Review/review.js';
import POI from './components/POI/poi.js';
import Error404 from './components/Error/error404.js';

import * as routes from './constants/routes';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path={routes._LANDING} component={() => <Landing/>} />
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
