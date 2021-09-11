import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, iconContainer } from '../../style/Dropdown.module.css';

function UserAvatar() {
  return (
    <p className={iconContainer}>
      <FontAwesomeIcon className={icon} icon="user" />
    </p>
  );
}

export default UserAvatar;
