import axios from 'axios';

const SET_USER = 'SET_USER';

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

const setUser = (data) => ({
  type: SET_USER, payload: data
})

export {
  signUp,
}