import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/AppRouter';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore from './reducers/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import './style/reset.css';
import './style/index.css';
import './utils/icons';

const {store, persistor} = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <AppRouter />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
