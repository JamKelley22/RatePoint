import * as types from '../actions/actionTypes.js';
import {initialState} from './initialState.js'

const userReducer = (state=initialState.user, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {...state, currUser: action.payload};
    case types.LOGOUT:
      return {...state, currUser: null};
    default:
      return state;
  }
}

export default userReducer;
