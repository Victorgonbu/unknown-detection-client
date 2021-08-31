import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navButton } from '../../../style/Navbar.module.css';
import PropTypes from 'prop-types';

function DropdownButton(props) {
  const { handleClick } = props;
  return (
    <div className={navButton} onClick={handleClick}>
      <FontAwesomeIcon icon="bars" />
    </div>
  );
}

DropdownButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default DropdownButton;
