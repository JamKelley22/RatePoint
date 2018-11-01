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

export function setAllPOIs(pois) {
  return { type: actions.SET_ALL_POIS, payload: pois }
}
