import Navbar from './containers/Navbar';
import { Outlet } from 'react-router-dom';
import DropdownMenu from './containers/DropdownMenu';
import { app, appContainer, active } from '../style/App.module.css';
import { connect } from 'react-redux';
import { useRef } from 'react';
import useToggleEffect from '../hooks/useToggleEffect';

function App(props) {
  const { dropdownActive } = props;
  const appRef = useRef();

  useToggleEffect(appRef, active, [dropdownActive]);

  return (
    <div className={app}>
      <DropdownMenu />
      <div ref={appRef} className={appContainer}>
        <Navbar />
        <Outlet/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  dropdownActive: state.user.dropdown
});

export default connect(mapStateToProps)(App);
