import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  post, postTitle, postImage,
  postInfo, titleFavorite,
} from '../../style/Post.module.css';
import Location from './Location';
import Favorite from './Favorite';

function Post(props) {
  const {
    imageUrl, title, location, favorite, id,
  } = props;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/posts/${title}`, { state: { id } });
  };

  return (
    <div className={post}>
      <img alt="Post poster" className={postImage} src={imageUrl} />
      <button data-testid="link-to" type="button" onClick={handleNavigate} className={postInfo}>
        <div className={titleFavorite}>
          <p className={postTitle}>{title}</p>
          {favorite
          && <Favorite withLabel inFavorites={favorite.id} />}
        </div>
        <Location value={location} />
      </button>
    </div>
  );
}

Post.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  favorite: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ])),
  id: PropTypes.string.isRequired,
};

Post.defaultProps = {
  favorite: null,
};

export default Post;
