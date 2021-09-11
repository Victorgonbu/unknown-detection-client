import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { title, authLink, authLinks } from '../../style/Dropdown.module.css';

function AuthLinks(props) {
  const { handleLink } = props;

  return (
    <div className={authLinks}>
      <h1 className={title}>Welcome to Unknown Detections!</h1>
      <Link data-testid="link" onClick={handleLink} className={authLink} to="signup">
        Sign up
      </Link>
      <Link data-testid="link" onClick={handleLink} className={authLink} to="login">
        Log in
      </Link>
    </div>
  );
}

AuthLinks.propTypes = {
  handleLink: PropTypes.func.isRequired,
};

export default AuthLinks;
