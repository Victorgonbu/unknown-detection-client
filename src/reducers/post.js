function postReducer(state = { all: null, searchActive: false }, action) {
  const { payload, type } = action;

  switch (type) {
    case 'SET_POSTS':
      return { ...state, all: payload };
    case 'SET_CURRENT_PATH_NAME':
      return { ...state, currentPathName: payload };
    case 'SET_SEARCH_STATE':
      return { ...state, searchActive: !state.searchActive };
    default:
      return state;
  }
}

export default postReducer;
