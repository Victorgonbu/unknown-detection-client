const userReducer = (state = {name: null, token: null}, action) => {
  const { payload, type } = action;
  switch(type) {
    case 'UPDATE_USER_NAME': 
      return {...state, name: payload}
    default: 
    return state;
  }
};

export default userReducer;