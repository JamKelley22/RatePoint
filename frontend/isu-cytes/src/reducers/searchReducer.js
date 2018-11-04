import * as types from '../actions/actionTypes.js';
import {initialState} from './initialState.js'

const searchReducer = (state=initialState.search, action) => {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return {...state, searchTerm: action.payload};
    default:
      return state;
  }
}

export default searchReducer;
