import { useNavigate } from 'react-router-dom';
import {
  post, postTitle, postImage,
  postInfo, titleFavorite,
} from '../../style/Post.module.css';
import Location from './Location';
import Favorite from './Favorite';
import PropTypes from 'prop-types';

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
      <img className={postImage} src={imageUrl} />
      <div onClick={handleNavigate} className={postInfo}>
        <div className={titleFavorite}>
          <p className={postTitle}>{title}</p>
          {favorite
          && <Favorite withLabel inFavorites={favorite.id} />}
        </div>
        <Location value={location} />
      </div>
    </div>
  );
}

Post.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  favorite: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ])),
  id: PropTypes.string.isRequired,
}

export default Post;
