import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function SearchIcon (props) {
  const {handleClick} = props;
  return(
    <div><FontAwesomeIcon className={handleClick} icon="search"/></div>
  );
};

export default SearchIcon;