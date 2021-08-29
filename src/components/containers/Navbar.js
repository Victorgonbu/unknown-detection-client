import { nav } from '../../style/Navbar.module.css'
import { connect } from 'react-redux'
import { toggleDropdown } from '../../actions/index';
import { useLocation } from 'react-router-dom';
import BackButton from '../presentationals/buttons/Back';
import DropdownButton from '../presentationals/buttons/Dropdown';
import NavCurrentPath from '../presentationals/NavCurrentPath';
import SearchIcon from '../presentationals/buttons/SearchIcon';
import {changeSearchState} from '../../actions/index';
function Navbar (props) {
  const { toggleDropdown, currentPathName,
    changeSearchState } = props;
  const location = useLocation();
  const currentPath = location.pathname.split('/');

  const handleDropdown = () => {
    toggleDropdown();
  };

  return(
    <>
      <div className={nav}>
      { currentPath.length < 3 ? <DropdownButton handleClick={handleDropdown}/> : <BackButton /> }
      <NavCurrentPath value={currentPathName}/>
      <SearchIcon handleClick={changeSearchState} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentPathName: state.posts.currentPathName,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => {dispatch(toggleDropdown())},
  changeSearchState: () => {dispatch(changeSearchState());},
});



export default connect(mapStateToProps, mapDispatchToProps)(Navbar);