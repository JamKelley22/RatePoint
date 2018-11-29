import * as types from '../actions/actionTypes.js';
import {initialState} from './initialState.js'

const userReducer = (state=initialState.user, action) => {
  switch (action.type) {
    case types.LOGIN:
    case types.CREATE_USER:
    case types.UPDATE_USER:
    case types.CREATE_LIST:
      return {...state, currUser: action.payload};
    case types.DELETE_LIST:
      return {
        ...state,
        currUser: {
          ...state.currUser,
          lists: state.currUser.lists.filter(list => list.id !== action.payload.id)
        }
      };
    case types.LOGOUT:
      console.log("Logout!");
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
    case types.SET_SELECTED_PERSON:
      return {
        ...state,
        selectedUser: action.payload
      }
    case types.UPDATE_LIST:
      return {
        ...state,
        currUser: {
          ...state.currUser,
          lists: state.currUser.lists.map(list => {
            if(list.id !== action.payload.id) {
              return list;
            }
            else {
              console.log("PAyload");
              return action.payload;
            }
          })
        }
      }
    default:
      return state;
  }
}

export default userReducer;
