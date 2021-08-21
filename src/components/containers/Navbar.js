import { nav } from '../../style/Navbar.module.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { updateUser } from '../../actions/index';

function Navbar (props) {
  const { username} = props;
  return(
    <>
      <div className={nav}>
      <div>Dropdown</div>
      <div>Unknown Detection</div>
      {username ? 
      <div>User</div> : 
      <Link to="/sign-up" >Sign up</Link>}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  username: state.user.name
});



export default connect(mapStateToProps)(Navbar);