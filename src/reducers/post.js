function postReducer(state = { all: null, current: null }, action) {
  const { payload, type } = action;

  switch (type) {
    case 'SET_POSTS':
      return { ...state, all: payload };
    case 'SET_CURRENT_POST':
      return { ...state, current: payload };
    case 'SET_CURRENT_AUTHOR':
      return { ...state, author: payload };
    case 'SET_CURRENT_FAVORITE':
      return { ...state, current: { ...state.current, favorite: payload } };
    case 'SET_FAVORITES_COUNTER':
      return { ...state, favoritesCounter: payload };
    case 'UPDATE_FAVORITES_COUNTER':
      return { ...state, favoritesCounter: state.favoritesCounter + payload };
    default:
      return state;
  }
}

export default postReducer;
