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

export const loginUser = (username, password) => (dispatch) =>
  new Promise((resolve, reject) => {
      // Function is expected to return a promise
      PersonAPI.VerifyPerson(username,password).then(person => {
        dispatch({
          type: actions.LOGIN,
          payload: person
        })

        resolve(person);
      }).catch(error => {
        // TBD: Handle errors for Redux
        reject(error);
      })
  });

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
export function setAllPOIs(pois) {
  return { type: actions.SET_ALL_POIS, payload: pois }
}
