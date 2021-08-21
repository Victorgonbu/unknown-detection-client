const userReducer = (state = {name: null, token: null}, action) => {
  const { payload, type } = action;
  switch(type) {
    case 'SET_USER': 
      return {...state, 
              name: payload.name, 
              token: payload.token}
    default: 
    return state;
  }
};

export default userReducer;