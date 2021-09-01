import { description, descriptionTop, 
  descriptionTitle, descriptionText } from '../../style/PostShow.module.css';
import PropTypes from 'prop-types';
import Favorite from './Favorite';

function Description (props) {
  const { favorite, favCounter } = props;
  return(
    <div className={description}>
      <div className={descriptionTop}>
        <h1 className={descriptionTitle}>About this</h1>
        <Favorite inFavorites={favorite} counter={favCounter} />
      </div>
      <p className={descriptionText}>{post.description}</p>
    </div>
  );
};

Description.propTypes = {
  favorite: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
};

Description.defaultProps = {
  favorite: null,
};

export default Description;