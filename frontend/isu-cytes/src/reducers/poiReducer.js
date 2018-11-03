import * as types from '../actions/actionTypes.js';
import {initialState} from './initialState.js'

const poiReducer = (state=initialState.poi, action) => {
  switch (action.type) {
    case types.SET_POI:
      return {...state, currPOI: action.payload};
    case types.SET_ALL_POIS:
      return {...state, allPOIs: action.payload}
    default:
      return state;
  }
}

export default poiReducer;
