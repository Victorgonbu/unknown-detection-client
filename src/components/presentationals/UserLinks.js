import { links, activeLink, link, userInfo,
  userName, userEmail } from '../../style/Dropdown.module.css';
import { NavLink as Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';

function UserLinks(props) {
  const { name, email, handleToggle } = props;

  return(
    <div className={links}>
      <div className={userInfo}>
        <UserAvatar />
        <p className={userName}>{name}</p>
        <span className={userEmail}>@{email}</span>
      </div>
      <Link onClick={handleToggle} to="/posts" activeClassName={activeLink} className={link}>Posts</Link>
      <Link onClick={handleToggle} to="/favorites" activeClassName={activeLink} className={link}>Favorites</Link>
      <a className={link}>Notifications</a>
      <a className={link}>Messages</a>
    </div>
  );
}

export default UserLinks;