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
  favorite: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  favCounter: PropTypes.number,
  text: PropTypes.string.isRequired,
};

Description.defaultProps = {
  favorite: null,
  favCounter: null,
};

export default Description;
