const userReducer = (state = {
  name: null,
  token: null,
}, action) => {
  const { payload, type } = action;
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        name: payload.name,
        email: payload.email_name,
        token: payload.token,
      };
    case 'SIGN_OUT':
      return { ...state, name: null, token: null };
    default:
      return state;
  }
};

export default userReducer;
