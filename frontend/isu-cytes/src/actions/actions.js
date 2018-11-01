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

export function loginUser(username,password) {
  return function (dispatch){
   return PersonAPI.VerifyPerson(username,password)
   .then(person => {
     dispatch({
       type: actions.LOGIN,
       payload: person
     })
   })
   .catch(error => {
     console.error("loginUser Error: " + error);
   })
 }
}

export function logoutUser() {
  return { type: actions.LOGOUT }
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
