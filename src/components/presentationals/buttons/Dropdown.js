import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navButton } from '../../../style/Navbar.module.css';

function DropdownButton(props) {
  const { handleClick } = props;
  return (
    <div className={navButton} onClick={handleClick}>
      <FontAwesomeIcon icon="bars" />
    </div>
  );
}

export default DropdownButton;
