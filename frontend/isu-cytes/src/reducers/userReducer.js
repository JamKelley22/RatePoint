import * as types from '../actions/actionTypes.js';
import {initialState} from './initialState.js'

const userReducer = (state=initialState.user, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {...state, currUser: action.payload};
    case types.LOGOUT:
      return {...state, currUser: null};
    case types.USER_DISCONNECT:
      return {
        ...state,
        user: {
          ...state.user,
          onlineusers: state.user.onlineusers.filter(user => user !== action.payload)
        }
      };
    case types.USER_CONNECT:
      return {
        ...state,
        user: {
          ...state.user,
          onlineusers: [
            ...state.user.onlineusers,
            action.payload
          ]
        }
      };
    case types.GET_CURRENT_USERS:
      return state;
    default:
      return state;
  }
}

export default userReducer;

/*
user: [
  ...state.todos,
  {
    text: action.text,
    completed: false
  }
]
*/
