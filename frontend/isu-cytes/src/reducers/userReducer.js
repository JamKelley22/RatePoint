import * as types from '../actions/actionTypes.js';
import {initialState} from './initialState.js'

const userReducer = (state=initialState.user, action) => {
  switch (action.type) {
    case types.LOGIN:
      console.log("userReducer == Login");
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}

export default userReducer;
