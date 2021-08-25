import axios from 'axios';
import { POSTS } from '../API';

const SET_USER = 'SET_USER';
const LOG_OUT = 'SIGN_OUT';
const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';

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

const logOut = () => ({
  type: LOG_OUT
});

const setUser = (data) => ({
  type: SET_USER, payload: data
})

const toggleDropdown = () => ({
  type: TOGGLE_DROPDOWN
});


const getAllPosts = () => {
  return async (dispatch) => {
    try {
      const request = axios.get(POSTS);
      console.log(request);
    }catch(error) {
      console.log(error);
    }
  }
};

export {
  authenticateUser,
  logOut,
  toggleDropdown,
  getAllPosts
}