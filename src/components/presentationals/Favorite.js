import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  postFavorite, favoriteIcon, favoriteCounter, activeFavorite,
} from '../../style/Post.module.css';
import PropTypes from 'prop-types';

function Favorite(props) {
  const { withLabel, counter, inFavorites } = props;

  const favIconClasses = () => {
    if (inFavorites) return `${favoriteIcon} ${activeFavorite}`;
    return favoriteIcon;
  };

  return (
    <div className={postFavorite}>
      <FontAwesomeIcon
        className={favIconClasses()}
        icon="heart"
      />
      {
        withLabel
        && <span> Favorite</span>
      }

      { counter >= 0
        && <span className={favoriteCounter}>{counter}</span>}

    </div>
  );
}

Favorite.propTypes = {
  withLabel: PropTypes.bool.isRequired,
  counter: PropTypes.number,
  inFavorites: PropTypes.bool.isRequired,
};

Favorite.defaultProps = {
  counter: null,
}

export default Favorite;
