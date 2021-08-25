import { links, activeLink, link, userInfo, icon, 
  iconContainer, userName, userEmail } from '../../style/Dropdown.module.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';

function UserLinks(props) {
  const { name, email } = props;

  return(
    <div className={links}>
      <div className={userInfo}>
        <p className={iconContainer}><FontAwesomeIcon className={icon} icon="user"/></p>
        <p className={userName}>{name}</p>
        <span className={userEmail}>@{email}</span>
      </div>
      <Link to="/posts" activeClassName={activeLink} className={link}>Posts</Link>
    </div>
  );
}

export default UserLinks;