import * as types from '../actions/actionTypes.js';

const userReducer = (state={}, action) => {
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
