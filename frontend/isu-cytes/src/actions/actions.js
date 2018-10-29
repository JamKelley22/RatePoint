import * as actions from './actionTypes.js'

export function setPOI(poi) {
  return { type: actions.SET_POI, payload: poi }
}
