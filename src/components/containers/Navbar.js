import { nav } from '../../style/Navbar.module.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNav from '../presentationals/UserNav';
import {signOut} from '../../actions/index';
import {useNavigate} from 'react-router-dom';

function Navbar (props) {
  const { username, signOut} = props;
  const navigate = useNavigate();

  const handleSingOut = () => {
    signOut();
    navigate('/');
  }

  return(
    <>
      <div className={nav}>
      <div className="Dropdown"> <FontAwesomeIcon icon="bars" /> </div>
      <div>Unknown Detection</div>
      {username ? 
      <UserNav name={username} signout={handleSingOut} /> : 
      <Link to="/sign-up" >Sign up</Link>}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  username: state.user.name
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => {dispatch(signOut())}  
});



export default connect(mapStateToProps, mapDispatchToProps)(Navbar);