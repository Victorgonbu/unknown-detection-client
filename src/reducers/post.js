function postReducer (state= { all: null }, action) {
  const { payload, type } = action;

  switch(type) {
    case 'SET_POSTS':
      return { ...state, all: payload };
    case 'SET_CURRENT_PATH_NAME': 
      return { ...state, currentPathName: payload};
    default:
      return state;
  }
};

export default postReducer;