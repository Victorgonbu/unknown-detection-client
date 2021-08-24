import { Link } from 'react-router-dom';
import { title, dropdownLink } from '../../style/Dropdown.module.css';

function AuthLinks(props) {
   const { handleLink } = props;

  return(
    <>
      <h1 className={title}>Welcome to Unknown Detections! </h1>
      <Link onClick={handleLink} className={dropdownLink} to="signup">Sign up</Link>
      <Link onClick={handleLink} className={dropdownLink} to="login" >Log in</Link>
    </>
  );
};

export default AuthLinks;