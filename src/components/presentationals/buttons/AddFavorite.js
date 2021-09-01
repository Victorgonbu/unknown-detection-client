import {favoriteButton} from '../../../style/PostShow.module.css';

function AddFavoriteButton (props) {
  const {handleClick} = props;
  return(
    <button data-testid="favorite-button" onClick={handleClick} type="button" className={favoriteButton}>
      {handleButtonText()}
    </button>
  );
};

export default AddFavoriteButton;