import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import App from './App';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import Posts from './containers/Posts';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AppRouter () {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') navigate('/posts');
   }, []);

  const routes = useRoutes([
    { path: '/', 
    element: <App/>,
    children: [
      { path: '/posts', element: <Posts /> }
    ]
    },
    { path: 'signup', element: <SignUp /> },
    { path: 'login', element: <Login/> }
  ]); 
  return routes;
}

export default AppRouter;