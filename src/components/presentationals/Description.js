import PropTypes from 'prop-types';
import {
  description, descriptionTop,
  descriptionTitle, descriptionText,
} from '../../style/PostShow.module.css';
import Favorite from './Favorite';

function Description(props) {
  const { favorite, favCounter, text } = props;
  return (
    <div className={description}>
      <div className={descriptionTop}>
        <h1 className={descriptionTitle}>About this</h1>
        <Favorite inFavorites={favorite} counter={favCounter} />
      </div>
      <p className={descriptionText}>{text}</p>
    </div>
  );
}

Description.propTypes = {
  favorite: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  favCounter: PropTypes.number,
  text: PropTypes.string.isRequired,
};

Description.defaultProps = {
  favorite: null,
  favCounter: 0,
};

export default Description;
