import axios from 'axios';

const SET_USER = 'SET_USER';
const SIGN_OUT = 'SIGN_OUT';
const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';

const signUp = (data) => {
  return async (dispatch) => {
    try {
      const userData = {user: data};
      const request = await axios.post('/api/v1/user', userData);
      if(request.data.status === 400) throw request.data.errors
      dispatch(setUser(request.data))

    }catch(error) {
      console.log(error);
    }
    
  }
};

const signOut = () => ({
  type: SIGN_OUT
});

const setUser = (data) => ({
  type: SET_USER, payload: data
})

const toggleDropdown = () => ({
  type: TOGGLE_DROPDOWN
});

export {
  signUp,
  signOut,
  toggleDropdown,
}