import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  postFavorite, favoriteIcon, favoriteCounter, activeFavorite,
} from '../../style/Post.module.css';

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
  withLabel: PropTypes.bool,
  counter: PropTypes.number,
  inFavorites: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

Favorite.defaultProps = {
  counter: null,
  withLabel: false,
  inFavorites: null,
};

export default Favorite;
