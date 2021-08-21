import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import App from './App';

function AppRouter () {
  const routes = useRoutes([
    { path: '/', 
    element: <App/>,
    children: []
    }
  ]);
  return routes;
}

export default AppRouter;