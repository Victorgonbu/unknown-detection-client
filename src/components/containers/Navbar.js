import { nav } from '../../style/Navbar.module.css'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, toggleDropdown } from '../../actions/index';
import {useNavigate} from 'react-router-dom';

function Navbar (props) {
  const { username, signOut, toggleDropdown} = props;
  const navigate = useNavigate();

  const handleSingOut = () => {
    signOut();
    navigate('/');
  }

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

const mapStateToProps = (state) => ({
  username: state.user.name
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => {dispatch(signOut())},
  toggleDropdown: () => {dispatch(toggleDropdown())},  
});



export default connect(mapStateToProps, mapDispatchToProps)(Navbar);