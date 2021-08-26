function postReducer (state= { all: null }, action) {
  const { payload, type } = action;

  switch(type) {
    case 'SET_POSTS':
      return { ...state, all: payload } 
    default:
      return state;
  }
};

export default postReducer;