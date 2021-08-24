import { Link } from 'react-router-dom';
import { title, authLink } from '../../style/Dropdown.module.css';

function AuthLinks(props) {
   const { handleLink } = props;

  return(
    <>
      <h1 className={title}>Welcome to Unknown Detections! </h1>
      <Link onClick={handleLink} className={authLink} to="signup">Sign up</Link>
      <Link onClick={handleLink} className={authLink} to="login" >Log in</Link>
    </>
  );
};

export default AuthLinks;