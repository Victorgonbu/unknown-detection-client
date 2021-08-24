import { nav } from '../../style/Navbar.module.css'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleDropdown } from '../../actions/index';

function Navbar (props) {
  const { toggleDropdown} = props;

  const handleDropdown = () => {
    toggleDropdown();
  };

  return(
    <>
      <div className={nav}>
      <div className="Dropdown" onClick={handleDropdown}> 
      <FontAwesomeIcon icon="bars" /> 
      </div>
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