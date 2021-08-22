import { container, active } from '../../style/Dropdown.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useRef } from 'react';
import useToggleEffect from '../../hooks/useToggleEffect';

const DropdownMenu = (props) => {
  const { dropdownActive } = props;
  const dropdownRef = useRef();

  useToggleEffect(dropdownRef, active, [dropdownActive]);
  
  return (
  <div ref={dropdownRef} className={container}>
    <Link to="sign-up">Sign up</Link>
    <Link to="login" >Log in</Link>
  </div>
  )
};

const mapStateToProps = (state) => ({
  dropdownActive: state.user.dropdown
});

export default connect(mapStateToProps)(DropdownMenu);