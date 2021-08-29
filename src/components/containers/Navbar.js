import { nav } from '../../style/Navbar.module.css'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleDropdown } from '../../actions/index';
import { useLocation } from 'react-router-dom';
import BackButton from '../presentationals/BackButton';

function Navbar (props) {
  const { toggleDropdown } = props;
  const location = useLocation();
  console.log(location.pathname);
  const currentPath = location.pathname.split('/');
  console.log(currentPath);

  const handleDropdown = () => {
    toggleDropdown();
  };

  return(
    <>
      <div className={nav}>
      { currentPath.length < 3 ?
        <div className="Dropdown" onClick={handleDropdown}> 
        <FontAwesomeIcon icon="bars" /> 
        </div> :
        <BackButton />
      }
      <div>Unknown Detection</div>
      <div><FontAwesomeIcon icon="search"/></div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => {dispatch(toggleDropdown())},
});



export default connect(null, mapDispatchToProps)(Navbar);