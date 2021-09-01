import PropTypes from 'prop-types';
import { favoriteButton } from '../../../style/PostShow.module.css';

function AddFavoriteButton(props) {
  const { handleClick, text } = props;
  return (
    <button data-testid="favorite-button" onClick={handleClick} type="button" className={favoriteButton}>
      {text}
    </button>
  );
}

AddFavoriteButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AddFavoriteButton;
