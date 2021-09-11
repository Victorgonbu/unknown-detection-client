import {
  useRoutes, useNavigate, useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import App from './App';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import Posts from './containers/Posts';
import Post from './containers/Post';

function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') navigate('/posts');
  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/posts', element: <Posts /> },
        { path: '/favorites', element: <Posts favoriteOnly /> },
        { path: '/posts/:title', element: <Post /> },
      ],
    },
    { path: 'signup', element: <SignUp /> },
    { path: 'login', element: <Login /> },
  ]);
  return routes;
}

export default AppRouter;
