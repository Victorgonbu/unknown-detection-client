import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { nav } from '../../style/Navbar.module.css';
import { toggleDropdown, changeSearchState } from '../../actions/index';
import BackButton from '../presentationals/buttons/Back';
import DropdownButton from '../presentationals/buttons/Dropdown';
import NavCurrentPath from '../presentationals/NavCurrentPath';
import SearchIcon from '../presentationals/buttons/SearchIcon';
import PropTypes from 'prop-types';

function Navbar(props) {
  const {
    toggleDropdown, currentPathName,
    changeSearchState, searchActive,
  } = props;
  const location = useLocation();
  const { search } = location;
  const currentPath = location.pathname.split('/');

  const handleDropdown = () => {
    toggleDropdown();
  };

  return (
    <>
      <div className={nav}>
        { currentPath.length > 2 || search ? <BackButton /> : <DropdownButton handleClick={handleDropdown} /> }
        <NavCurrentPath value={currentPathName} />
        <SearchIcon active={searchActive} handleClick={changeSearchState} />
      </div>
    </>
  );
};

Navbar.propTypes = {
  currentPathName: PropTypes.string.isRequired,
  searchActive: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  changeSearchState: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  currentPathName: state.posts.currentPathName,
  searchActive: state.posts.searchActive,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => { dispatch(toggleDropdown()); },
  changeSearchState: () => { dispatch(changeSearchState()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
