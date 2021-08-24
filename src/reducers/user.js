const userReducer = (state = {
  name: null, 
  token: null,
  dropdown: false
}, action) => {
  const { payload, type } = action;
  switch(type) {
    case 'SET_USER': 
      return {...state, 
              name: payload.name,
              email: payload.email,
              token: payload.token}
    case 'SIGN_OUT': 
      return {...state, name: null, token: null} 
      
    case 'TOGGLE_DROPDOWN': 
      return {...state, dropdown: !state.dropdown}
    default: 
    return state;
  }
};

export default userReducer;