import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { navButton } from '../../../style/Navbar.module.css';

function SearchIcon(props) {
  const { handleClick, active } = props;
  return (
    <>
      {active
        ? (
          <button
            data-testid="close-button"
            type="button"
            className={navButton}
            onClick={handleClick}
          >
            &times;
          </button>
        )
        : (
          <button
            data-testid="search-icon"
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
};

export default SearchIcon;
