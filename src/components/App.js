import Navbar from './containers/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  );
}

export default App;
