import { container, active, dropdownLink,
         title, footer, top } from '../../style/Dropdown.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useRef } from 'react';
import useToggleEffect from '../../hooks/useToggleEffect';
import { toggleDropdown } from '../../actions';

const DropdownMenu = (props) => {
  const { dropdownActive, toggleDropdown } = props;
  const dropdownRef = useRef();

  useToggleEffect(dropdownRef, active, [dropdownActive]);
  

  return (
  <div ref={dropdownRef} className={container}>
    <div className={top}>
      <h1 className={title}>Welcome to Unknown Detections! </h1>
      <Link onClick={toggleDropdown} className={dropdownLink} to="sign-up">Sign up</Link>
      <Link onClick={toggleDropdown} className={dropdownLink} to="login" >Log in</Link>
    </div>
    <p className={footer}>Victor @2021</p>
  </div>
  )
};

const mapStateToProps = (state) => ({
  dropdownActive: state.user.dropdown
});

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => {dispatch(toggleDropdown())}
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);