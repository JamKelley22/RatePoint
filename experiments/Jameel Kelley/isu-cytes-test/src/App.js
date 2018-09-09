import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import * as routes from './constants/routes';
import Landing from './components/Landing/landing.js'
import Home from './components/Home/home.js'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <div id='content'>
            <Route exact path={routes.HOME} component={() => <Home/>} />
            <Route exact path={routes.LANDING} component={() => <Landing/>} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
