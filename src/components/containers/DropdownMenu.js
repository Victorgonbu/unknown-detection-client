import { NavLink as Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  container, active, footer, top, links,
  link, activeLink,
} from '../../style/Dropdown.module.css';
import useToggleEffect from '../../hooks/useToggleEffect';
import { toggleDropdown, logOut } from '../../actions';
import AuthLinks from '../presentationals/AuthLinks';
import UserLinks from '../presentationals/UserLinks';
import FooterLinks from '../presentationals/FooterLinks';

const DropdownMenu = (props) => {
  const {
    dropdownActive, toggleDropdown,
    username, email, logOut,
  } = props;

  const dropdownRef = useRef();
  const navigate = useNavigate();

  useToggleEffect(dropdownRef, active, [dropdownActive]);

  const handleLogOut = () => {
    logOut();
    toggleDropdown();
    navigate('/posts');
  };

  return (
    <div ref={dropdownRef} data-testid="dropdown" className={container}>
      <div className={top}>
        {username ? <UserLinks handleToggle={toggleDropdown} name={username} email={email} />
          : (
            <>
              <AuthLinks handleLink={toggleDropdown} />
              <div className={links}>
                <Link to="/posts" activeClassName={activeLink} className={link}>Posts</Link>
              </div>
            </>
          )}
      </div>

      { username ? <FooterLinks handleLogOut={handleLogOut} />
        : <p className={footer}>Victor @2021</p> }

    </div>
  );
};

DropdownMenu.propTypes = {
  dropdownActive: PropTypes.bool.isRequired,
  username: PropTypes.string,
  email: PropTypes.string,
  toggleDropdown: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

DropdownMenu.defaultProps = {
  username: null,
  email: null,
};

const mapStateToProps = (state) => ({
  dropdownActive: state.user.dropdown,
  username: state.user.name,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => { dispatch(toggleDropdown()); },
  logOut: () => { dispatch(logOut()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);
