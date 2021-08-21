import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import App from './App';
import SignUp from './containers/SignUp';

function AppRouter () {
  const routes = useRoutes([
    { path: '/', 
    element: <App/>,
    children: [
      {path: 'sign-up', element: <SignUp />}
    ]
    }
  ]);
  return routes;
}

export default AppRouter;