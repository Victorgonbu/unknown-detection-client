import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navButton } from '../../../style/Navbar.module.css';
import PropTypes from 'prop-types';

function SearchIcon(props) {
  const { handleClick, active } = props;
  return (
    <>
      {active
        ? (
          <button
            type="button"
            className={navButton}
            onClick={handleClick}
          >
            &times;
          </button>
        )
        : (
          <button
            type="button"
            className={navButton}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon="search" />
          </button>
        )}
    </>

  );
}

SearchIcon.propTypes = {
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
}

export default SearchIcon;
