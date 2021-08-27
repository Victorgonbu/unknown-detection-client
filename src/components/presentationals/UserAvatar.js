import { icon, iconContainer } from '../../style/Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserAvatar () {
  return(
    <p className={iconContainer}>
      <FontAwesomeIcon className={icon} icon="user"/>
    </p>
  );
};

export default UserAvatar;