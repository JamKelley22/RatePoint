import * as actions from './actionTypes.js'
import { POIAPI, PersonAPI, ListAPI } from '../api/'

export function setPOI(poi) {
  return { type: actions.SET_POI, payload: poi }
}

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
        reject({error: error});
      })
  });

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
        reject({error: error});
      })
  });

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
        reject({error: error});
      })
  });

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
        reject({error: error});
      })
  });

export const updateList = (listID,poilist) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       ListAPI.UpdateList(listID,poilist).then(person => {//Returns a person
        //Next two actions are async
        if(!person.error) {
          dispatch({
            type: actions.UPDATE_LIST,
            payload: person
          })
          resolve(person);
        }
        else {
          reject(person)
        }
      }).catch(error => {
        reject({error: error});
      })
  });

export function logoutUser(username) {
  return { type: actions.LOGOUT, payload: username }
}

export function userDisconnect(username) {
  return { type: actions.USER_DISCONNECT, payload: username }
}
export function userConnect(username) {
  return { type: actions.USER_CONNECT, payload: username }
}
export function getCurrentUsers() {
  return { type: actions.GET_CURRENT_USERS }
}
export function setAllPOIs(pois) {
  return { type: actions.SET_ALL_POIS, payload: pois }
}

export function setSelectedPOI(poi) {
  return { type: actions.SET_POI, payload: poi }
}

export const approvePOI = (poi) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       POIAPI.UpdatePOI(poi.id,poi.name,poi.pictures,poi.description,poi.coordinates).then(poi => {
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
        reject({error: error});
      })
  });

export const rejectPOI = (poi) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       POIAPI.UpdatePOI(poi.id,poi.name,poi.pictures,poi.description,poi.coordinates).then(poi => {
        if(!poi.error) {
          dispatch({
            type: actions.REJECT_POI,
            payload: poi
          })
          resolve(poi);
        }
        else {
          reject(poi)
        }
      }).catch(error => {
        reject({error: error});
      })
  });

export function setSearchTerm(term) {
  return { type: actions.SET_SEARCH_TERM, payload: term }
}

export const submitPOI = (userID,name,pictures,description,coordinates) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
       POIAPI.SubmitPOI(userID,name,pictures,description,coordinates).then(poi => {
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
        reject({error: error});
      })
  });

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
        reject({error: error});
      })
  });
