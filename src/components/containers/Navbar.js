import { nav } from '../../style/Navbar.module.css'
import { connect } from 'react-redux'
import { toggleDropdown } from '../../actions/index';
import { useLocation } from 'react-router-dom';
import BackButton from '../presentationals/buttons/Back';
import DropdownButton from '../presentationals/buttons/Dropdown';
import NavCurrentPath from '../presentationals/NavCurrentPath';
import SearchIcon from '../presentationals/buttons/SearchIcon';

function Navbar (props) {
  const { toggleDropdown, currentPathName } = props;
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
      <SearchIcon handleClick={} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentPathName: state.posts.currentPathName,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => {dispatch(toggleDropdown())},
});



export default connect(mapStateToProps, mapDispatchToProps)(Navbar);