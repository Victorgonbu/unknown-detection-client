import { NavLink as Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  links, activeLink, link, userInfo,
  userName, userEmail,
} from '../../style/Dropdown.module.css';
import UserAvatar from './UserAvatar';

function UserLinks(props) {
  const { name, email, handleToggle } = props;

  return (
    <div className={links}>
      <div className={userInfo}>
        <UserAvatar />
        <p className={userName}>{name}</p>
        <span className={userEmail}>
          @
          {email}
        </span>
      </div>
      <Link onClick={handleToggle} to="/posts" activeClassName={activeLink} className={link}>Posts</Link>
      <Link onClick={handleToggle} to="/favorites" activeClassName={activeLink} className={link}>Favorites</Link>
      <div className={link}>Notifications</div>
      <div className={link}>Messages</div>
    </div>
  );
}

UserLinks.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default UserLinks;
