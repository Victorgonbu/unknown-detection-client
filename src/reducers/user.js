const userReducer = (state = {name: null, token: null}, action) => {
  const { payload, type } = action;
  switch(type) {
    default: 
    return state;
  }
};

export default userReducer;