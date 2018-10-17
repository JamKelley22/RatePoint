const userReducer = (state=[], action) => {
  switch (action.type) {
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export default userReducer;
