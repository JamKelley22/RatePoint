import * as actions from './actionTypes.js'

export function setPOI(poi) {
  console.log({ type: actions.SET_POI, payload: poi });
  return { type: actions.SET_POI, payload: poi }
}
