import Navbar from './containers/Navbar';
import { Outlet } from 'react-router-dom';
import DropdownMenu from './containers/DropdownMenu';
import { app, appContainer, active } from '../style/App.module.css';
import { connect } from 'react-redux';
import { useRef } from 'react';
import useToggleEffect from '../hooks/useToggleEffect';
import SearchBox from './containers/SearchBox';

function App(props) {
  const { dropdownActive,
  searchActive } = props;
  const appRef = useRef();

  useToggleEffect(appRef, active, [dropdownActive]);

  return (
    <div className={app}>
      <DropdownMenu />
      <div ref={appRef} className={appContainer}>
        <Navbar />
        { searchActive
        &&
        <SearchBox /> }
        <Outlet/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  dropdownActive: state.user.dropdown,
  searchActive: state.posts.searchActive,
});

export default connect(mapStateToProps)(App);
