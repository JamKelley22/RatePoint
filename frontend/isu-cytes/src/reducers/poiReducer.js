import * as types from '../actions/actionTypes.js';
import {initialState} from './initialState.js'

const poiReducer = (state=initialState.poi, action) => {
  switch (action.type) {
    case types.SET_POI:
      console.log(action.payload);
      return {...state, currPOI: action.payload};
    default:
      return state;
  }
}

export default poiReducer;
