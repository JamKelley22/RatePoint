import * as actions from './actionTypes.js'
import {POIAPI,PersonAPI} from '../api/'

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
