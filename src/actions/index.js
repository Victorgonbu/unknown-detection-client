import axios from '../utils/axios';
import { POSTS, FAVORITE_POSTS, SEARCH } from '../API';

const SET_USER = 'SET_USER';
const LOG_OUT = 'SIGN_OUT';
const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
const SET_POSTS = 'SET_POSTS';
const SET_CURRENT_PATH_NAME = 'SET_CURRENT_PATH_NAME';
const SET_SEARCH_STATE = 'SET_SEARCH_STATE';
const SET_CURRENT_POST = 'SET_CURRENT_POST';
const SET_CURRENT_AUTHOR = 'SET_CURRENT_AUTHOR';
const SET_FAVORITES_COUNTER = 'SET_FAVORITES_COUNTER';
const SET_CURRENT_FAVORITE = 'SET_CURRENT_FAVORITE';
const UPDATE_FAVORITES_COUNTER = 'UPDATE_FAVORITES_COUNTER';

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

const setPostAttributes = (type, data) => ({
  type,
  payload: data,
});

const authenticateUser = (data, url, setErrors) => async (dispatch) => {
  try {
    const userData = { user: data };
    const request = await axios.post(url, userData);
    dispatch(setUser(request.data.data.attributes));
  } catch (error) {
    setErrors(error.response.data.errors);
  }
};

const addPostToFavorites = (postID, authToken, setErrors) => async (dispatch) => {
  try {
    const data = { favorite: { post_id: postID } };
    const request = await axios.post(`${FAVORITE_POSTS}`, data,
      { headers: { Authorization: `Bearer ${authToken}` } });
    dispatch(setPostAttributes(SET_CURRENT_FAVORITE, { id: request.data.data.id }));
  } catch {
    setErrors(['Unable to Add post to favorites']);
    dispatch(setPostAttributes(SET_CURRENT_FAVORITE, null));
    dispatch(setPostAttributes(UPDATE_FAVORITES_COUNTER, -1));
  }
};

const removePostFromFavorites = (authToken, setErrors) => async (dispatch, getState) => {
  try {
    const post = getState().posts.current;
    await axios.delete(`${FAVORITE_POSTS}/${post.favorite.id}`,
      { headers: { Authorization: `Bearer ${authToken}` } });
  } catch {
    setErrors(['Unable to remove post from favorites']);
    dispatch(setPostAttributes(SET_CURRENT_FAVORITE, { id: '' }));
    dispatch(setPostAttributes(UPDATE_FAVORITES_COUNTER, 1));
  }
};

const getPost = (postID, authToken, setErrors) => async (dispatch) => {
  try {
    const request = await axios.get(`${POSTS}/${postID}`, {
      headers:
        { Authorization: `Bearer ${authToken}` },
    });

    const { data } = request;
    dispatch(setCurrentPathName(data.data.attributes.title));
    dispatch(setPostAttributes(SET_CURRENT_POST, data.data.attributes));
    dispatch(setPostAttributes(SET_CURRENT_AUTHOR, data.included[0].attributes));
    dispatch(setPostAttributes(SET_FAVORITES_COUNTER,
      data.data.relationships.favorites.data.length));
  } catch {
    setErrors(['Unable to fetch Post']);
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
  getPost,
  getPosts,
  setCurrentPathName,
  changeSearchState,
  removePostFromFavorites,
  addPostToFavorites,
  setPostAttributes,
};
