import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { navButton } from '../../../style/Navbar.module.css';

function DropdownButton(props) {
  const { handleClick } = props;
  return (
    <button type="button" className={navButton} onClick={handleClick}>
      <FontAwesomeIcon icon="bars" />
    </button>
  );
}

DropdownButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default DropdownButton;
