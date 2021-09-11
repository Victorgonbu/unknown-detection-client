function navbarReducer(state = {
  searchActive: false,
  dropdown: false,
}, action) {
  const { payload, type } = action;
  switch (type) {
    case 'TOGGLE_DROPDOWN':
      return { ...state, dropdown: !state.dropdown };
    case 'SET_CURRENT_PATH_NAME':
      return { ...state, currentPathName: payload };
    case 'SET_SEARCH_STATE':
      return { ...state, searchActive: !state.searchActive };
    default:
      return state;
  }
}

export default navbarReducer;
