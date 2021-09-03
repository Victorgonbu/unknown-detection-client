import axios from '../utils/axios';
import { POSTS, FAVORITE_POSTS, SEARCH } from '../API';

const SET_USER = 'SET_USER';
const LOG_OUT = 'SIGN_OUT';
const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
const SET_POSTS = 'SET_POSTS';
const SET_CURRENT_PATH_NAME = 'SET_CURRENT_PATH_NAME';
const SET_SEARCH_STATE = 'SET_SEARCH_STATE';

const logOut = () => ({
  type: LOG_OUT,
});

const setUser = (data) => ({
  type: SET_USER, payload: data,
});

const toggleDropdown = () => ({
  type: TOGGLE_DROPDOWN,
});

const setPosts = (posts) => ({
  type: SET_POSTS, payload: posts,
});

const setCurrentPathName = (name) => ({
  type: SET_CURRENT_PATH_NAME, payload: name,
});

const changeSearchState = () => ({
  type: SET_SEARCH_STATE,
});

const authenticateUser = (data, url, setErrors) => async (dispatch) => {
  try {
    const userData = { user: data };
    const request = await axios.post(url, userData);
    dispatch(setUser(request.data));
  } catch (error) {
    setErrors(error.response.data.errors);
  }
};

const getPosts = (type, setError, query = null) => async (dispatch, getState) => {
  try {
    let url;
    if (query) url = SEARCH + query;
    else url = type === 'favorite' ? FAVORITE_POSTS : POSTS;
    const authToken = getState().user.token;
    const request = await axios.get(url, { headers: { Authorization: `Bearer ${authToken}` } });
    const response = request.data.data;
    if (response.length === 0) setError(['No posts added yet']);
    dispatch(setPosts(response));
  } catch (error) {
    dispatch(setPosts([]));
    if (error.response.status === 500) {
      setError(['Unable to fetch from API, please try again in 20 seconds']);
    } else if (error.response.status === 404) {
      setError(error.response.data.errors);
    }
  }
};

export {
  authenticateUser,
  logOut,
  toggleDropdown,
  getPosts,
  setCurrentPathName,
  changeSearchState,
};
