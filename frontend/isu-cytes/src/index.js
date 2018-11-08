import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ConnectedRouter } from 'react-router-redux'
import { store } from './store.js'
import { Provider } from 'react-redux'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

//Make sure that user is at least notified before leaving page
//Annoying for devlopment b/c it also runs on page reload
/*
window.onbeforeunload = function() {
    return 'testing';
};
*/
let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);
registerServiceWorker();
