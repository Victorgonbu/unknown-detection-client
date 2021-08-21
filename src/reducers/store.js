import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;


