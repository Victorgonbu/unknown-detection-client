import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import App from './App';
import SignUp from './containers/SignUp';
import Login from './containers/Login';

function AppRouter () {
  const routes = useRoutes([
    { path: '/', 
    element: <App/>,
    children: [
      {path: 'sign-up', element: <SignUp />},
      {path: 'login', element: <Login /> }
    ]
    }
  ]);
  return routes;
}

export default AppRouter;