import * as types from '../actions/actionTypes.js';
import {initialState} from './initialState.js'

const userReducer = (state=initialState.user, action) => {
  switch (action.type) {
    case types.LOGIN:
    case types.CREATE_USER:
      return {...state, currUser: action.payload};
    case types.LOGOUT:
      return {...state, currUser: null, onlineusers: []};
    case types.USER_DISCONNECT:
      return {
        ...state,
        onlineusers: state.onlineusers.filter(user => user !== action.payload)
      };
    case types.USER_CONNECT:
      return {
        ...state,
        onlineusers: [
          ...state.onlineusers,
          action.payload
        ]
      };
    case types.GET_CURRENT_USERS:
      return state;
    default:
      return state;
  }
}

export default userReducer;
