function postReducer (state, action) {
  const { payload, type } = action;

  switch(type) {
    case 'SET_ALL_POSTS':
      return { ...state, all: payload } 
    default:
      return state;
  }
};

export default postReducer;