import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function DropdownButton (props) {
  const {handleClick} = props;
  return(
    <div className="Dropdown" onClick={handleClick}> 
      <FontAwesomeIcon icon="bars" /> 
    </div>
  );
}

export default DropdownButton;