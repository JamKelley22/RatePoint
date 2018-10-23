import * as types from '../actions/actionTypes.js';

const poiReducer = (state={currPOI: null}, action) => {
  switch (action.type) {
    case types.SET_POI:
      console.log(action.payload);
      return {...state, currPOI: action.payload};
    default:
      return state;
  }
}

export default poiReducer;
