import axios from 'axios';
import { POSTS, FAVORITE_POSTS } from '../API';

const SET_USER = 'SET_USER';
const LOG_OUT = 'SIGN_OUT';
const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
const SET_POSTS = 'SET_POSTS';
const SET_CURRENT_PATH_NAME = 'SET_CURRENT_PATH_NAME';

const logOut = () => ({
  type: LOG_OUT
});

const setUser = (data) => ({
  type: SET_USER, payload: data
})

const toggleDropdown = () => ({
  type: TOGGLE_DROPDOWN
});

const setPosts = (posts) => ({
  type: SET_POSTS, payload: posts
});

const setCurrentPathName = (name) => ({
  type: SET_CURRENT_PATH_NAME, payload: name
});

const changeSearchState = () => ({
  type: SET_SEARCH_STATE
});

const authenticateUser = (data, url) => {
  return async (dispatch) => {
    try {
      const userData = {user: data};
      const request = await axios.post(url, userData);
      if(request.data.status === 400) throw request.data.errors
      dispatch(setUser(request.data))

    }catch(error) {
      console.log(error);
    }
    
  }
};

const getPosts = (type) => {
  return async (dispatch, getState) => {
    try {
      const url = type === 'favorite' ? FAVORITE_POSTS : POSTS
      const authToken = getState().user.token;
      const request = await axios.get(url, { headers: { Authorization: `Bearer ${authToken}` } });
      dispatch(setPosts(request.data.data));
    }catch(error) {
      console.log(error);
    }
  }
};

export {
  authenticateUser,
  logOut,
  toggleDropdown,
  getPosts,
  setCurrentPathName,
  changeSearchState
}