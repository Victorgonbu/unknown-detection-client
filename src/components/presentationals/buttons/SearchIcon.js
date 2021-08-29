import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {navButton} from '../../../style/Navbar.module.css';

function SearchIcon (props) {
  const {handleClick, active} = props;
  return(
    <>
      {active ?
      <button 
       type="button"
       className={navButton}
       onClick={handleClick}
       >
        &times;
      </button>
      :
      <button 
      type="button"
      className={navButton} 
      onClick={handleClick}>
        <FontAwesomeIcon icon="search"/>
      </button>
      }
    </>
    
  );
};

export default SearchIcon;