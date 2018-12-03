import * as actions from './actionTypes.js'
import { POIAPI, PersonAPI, ListAPI } from '../api/'

/**
 * Updates the locally cached (Redux) POI list from server
 * @param {username} The name of the user logged in
 * @return Promise, resolves to poi list or error
 */
export function updatePOIList() {
  return function (dispatch){
   return POIAPI.GetPOIs().then(pois => {
     dispatch( {
       type: actions.SET_POI_LIST,
       payload: pois
     })
   })
 }
}

/**
 * Creates a user
 * @param {username,email,name,biography,password}
 * @return Promise, resolves to user or error
 */
export const createUser = (username,email,name,biography,password) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
      PersonAPI.SubmitPerson(username,email,name,biography,password).then(person => {
        //Next two actions are async
        if(!person.error) {
          dispatch({
            type: actions.CREATE_USER,
            payload: person
          })
          resolve(person);
        }
        else {
          reject(person)
        }
      }).catch(error => {
        reject(error);
      })
  });

  /**
   * Logs a user in
   * @param {username,password}
   * @return Promise, resolves to user or error
   */
export const loginUser = (username, password) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
      PersonAPI.VerifyPerson(username,password).then(person => {
        //Next two actions are async
        if(!person.error) {
          dispatch({
            type: actions.LOGIN,
            payload: person
          })
          resolve(person);
        }
        else {
          reject(person)
        }
      }).catch(error => {
        reject(error);
      })
  });

/**
 * Updates fields on a user
 * @param {oldUsername,newUsername,email,name,biography,password}
 * @return Promise, resolves to user or error
 */
export const updateUser = (oldUsername,newUsername,email,name,biography,password) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       PersonAPI.UpdatePerson(oldUsername,newUsername,email,name,biography,password).then(person => {
        //Next two actions are async
        if(!person.error) {
          dispatch({
            type: actions.UPDATE_USER,
            payload: person
          })
          resolve(person);
        }
        else {
          reject(person)
        }
      }).catch(error => {
        reject(error);
      })
  });

/**
 * Creates a list for a user specified
 * @param {username,listname,poilist}
 * @return Promise, resolves to user or error
 */
export const createList = (username,listname,poilist) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       ListAPI.CreateList(username,listname,poilist).then(person => {//Returns a person
        //Next two actions are async
        if(!person.error) {
          dispatch({
            type: actions.CREATE_LIST,
            payload: person
          })
          resolve(person);
        }
        else {
          reject(person)
        }
      }).catch(error => {
        reject(error);
      })
  });

/**
 * Updates a list for a user specified
 * @param {listID,listname,poilist}
 * @return Promise, resolves to user or error
 */
export const updateList = (listID,listname,poilist) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       ListAPI.UpdateList(listID,listname,poilist).then(list => {
        //Next two actions are async
        if(!list.error) {
          dispatch({
            type: actions.UPDATE_LIST,
            payload: list
          })
          resolve(list);
        }
        else {
          reject(list)
        }
      }).catch(error => {
        reject(error);
      })
  });

/**
 * Deletes a list for a user specified
 * @param {listID}
 * @return Promise, resolves to user or error
 */
  export const deleteList = (listID) => (dispatch) =>
    new Promise((resolve, reject) => {
        // Function is expected to return a promise
         ListAPI.DeleteList(listID).then(list => {
          //Next two actions are async
          if(!list.error) {
            console.log("NO EERR DEL");
            dispatch({
              type: actions.DELETE_LIST,
              payload: list
            })
            resolve(list);
          }
          else {
            reject(list)
          }
        }).catch(error => {
          reject(error);
        })
    });

/**
 * Logs out a user by username
 * @param {username}
 * @return actionDispatch
 */
export function logoutUser(username) {
  return { type: actions.LOGOUT, payload: username }
}

/**
 * Dissocnnects a user from webSocket by username
 * @param {username}
 * @return actionDispatch
 */
export function userDisconnect(username) {
  return { type: actions.USER_DISCONNECT, payload: username }
}
/**
 * Connects a user to webSocket by username
 * @param {username}
 * @return actionDispatch
 */
export function userConnect(username) {
  return { type: actions.USER_CONNECT, payload: username }
}
/**
 * Gets and updates cache of current users
 * @param {}
 * @return actionDispatch
 */
export function getCurrentUsers() {
  return { type: actions.GET_CURRENT_USERS }
}
/**
 * Gets and sets all pois from server to cache
 * @param {username}
 * @return actionDispatch
 */
export function setAllPOIs(pois) {
  return { type: actions.SET_ALL_POIS, payload: pois }
}

/**
 * Sets the selected POI locally (redux) by poi object
 * @param {poi}
 * @return actionDispatch
 */
export function setSelectedPOI(poi) {
  return { type: actions.SET_POI, payload: poi }
}

/**
 * Approves the specified POI
 * @param {poi}
 * @return Promise
 */
export const approvePOI = (poi) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       POIAPI.UpdatePOI(poi.id,poi.name,poi.pictures,poi.description,poi.coordinates,true).then(poi => {
        if(!poi.error) {
          dispatch({
            type: actions.APPROVE_POI,
            payload: poi
          })
          resolve(poi);
        }
        else {
          reject(poi)
        }
      }).catch(error => {
        reject(error);
      })
  });

/**
 * Rejects the specified POI
 * @param {poi}
 * @return Promise
 */
export const rejectPOI = (poi) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       POIAPI.DeletePOI(poi.id).then(poi => {
        if(!poi.error) {
          dispatch({
            type: actions.DELETE_POI,
            payload: poi
          })
          resolve(poi);
        }
        else {
          reject(poi)
        }
      }).catch(error => {
        reject(error);
      })
  });

/**
 * Sets the search term in redux store
 * @param {term}
 * @return Action
 */
export function setSearchTerm(term) {
  return { type: actions.SET_SEARCH_TERM, payload: term }
}

/**
 * Submits a new POI
 * @param {userID,name,pictures,description,coordinates}
 * @return Promise
 */
export const submitPOI = (userID,name,pictures,description,coordinates) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       POIAPI.SubmitPOI(userID,name,pictures,description,coordinates).then(poi => {
         console.log(poi);
        if(!poi.error) {
          dispatch({
            type: actions.ADD_POI,
            payload: poi
          })
          resolve(poi);
        }
        else {
          reject(poi)
        }
      }).catch(error => {
        reject(error);
      })
  });

/**
 * Gets the full user object by username
 * @param {username}
 * @return Promise
 */
export const getSetSelectedUserByUsername = (username) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       PersonAPI.GetPerson(username).then(person => {
        if(!person.error) {
          dispatch({
            type: actions.SET_SELECTED_PERSON,
            payload: person
          })
          resolve(person);
        }
        else {
          reject(person)
        }
      }).catch(error => {
        reject(error);
      })
  });
