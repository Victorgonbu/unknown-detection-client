const UPDATE_USER_NAME = 'UPDATE_USER_NAME';

const updateUser = (name) => ({
  type: UPDATE_USER_NAME,
  payload: name
})

export {
  updateUser,
}