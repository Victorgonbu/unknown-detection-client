import { container, active, footer, top, links, 
  link, activeLink } from '../../style/Dropdown.module.css';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useRef } from 'react';
import useToggleEffect from '../../hooks/useToggleEffect';
import { toggleDropdown } from '../../actions';
import AuthLinks from '../presentationals/AuthLinks';
import UserLinks from '../presentationals/UserLinks';

const DropdownMenu = (props) => {
  const { dropdownActive, toggleDropdown, username } = props;
  const dropdownRef = useRef();

  useToggleEffect(dropdownRef, active, [dropdownActive]);
  

  return (
  <div ref={dropdownRef} className={container}>
    <div className={top}>
      {username ?  <UserLinks /> : <AuthLinks handleLink={toggleDropdown}/>}
      <div className={links}>
        <Link to="/posts" activeClassName={activeLink} className={link}>Posts</Link>
      </div>
    </div>
    <p className={footer}>Victor @2021</p>
  </div>
  )
};

const mapStateToProps = (state) => ({
  dropdownActive: state.user.dropdown,
  username: state.user.name
});

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => {dispatch(toggleDropdown())}
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);