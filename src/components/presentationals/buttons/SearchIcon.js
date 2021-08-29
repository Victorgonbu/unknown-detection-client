import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {navButton} from '../../../style/Navbar.module.css';

function SearchIcon (props) {
  const {handleClick} = props;
  return(
    <button className={navButton} type="button" onClick={handleClick}>
      <FontAwesomeIcon icon="search"/>
    </button>
  );
};

export default SearchIcon;