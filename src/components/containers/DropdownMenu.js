import { container, active, footer, top, links, 
  link, activeLink } from '../../style/Dropdown.module.css';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useRef } from 'react';
import useToggleEffect from '../../hooks/useToggleEffect';
import { toggleDropdown, logOut } from '../../actions';
import AuthLinks from '../presentationals/AuthLinks';
import UserLinks from '../presentationals/UserLinks';
import FooterLinks from '../presentationals/FooterLinks';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = (props) => {
  const { dropdownActive, toggleDropdown, 
    username, email, logOut } = props;
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useToggleEffect(dropdownRef, active, [dropdownActive]);
  
  const handleLogOut = () => {
    logOut();
    toggleDropdown();
    navigate('/posts');
  };

  return (
  <div ref={dropdownRef} className={container}>
    <div className={top}>
      {username ?  <UserLinks handleToggle={toggleDropdown} name={username} email={email} /> :
      <>
        <AuthLinks handleLink={toggleDropdown}/>
        <div className={links}>
          <Link to="/posts" activeClassName={activeLink} className={link}>Posts</Link>
        </div>
      </>
      }
    </div>

    { username ? <FooterLinks handleLogOut={handleLogOut} /> 
    : 
    <p className={footer}>Victor @2021</p> }
    
  </div>
  )
};

const mapStateToProps = (state) => ({
  dropdownActive: state.user.dropdown,
  username: state.user.name,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => {dispatch(toggleDropdown())},
  logOut: () => { dispatch(logOut()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);