import { post, postTitle, postImage, 
  postLocation, postInfo, postFavorite, 
  locationLabel, titleFavorite, favoriteIcon } from '../../style/Post.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function Post (props) {
  const {imageUrl, title, location, favorite, id} = props;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/posts/${title}`, { state: {id} });
  };

  return(
    <div className={post}>
      <img className={postImage} src={imageUrl} />
      <div onClick={handleNavigate} className={postInfo}>
        <div className={titleFavorite}>
          <p className={postTitle}>{title}</p>
          {favorite 
          &&
          <div className={postFavorite}>
            <FontAwesomeIcon 
            className={favoriteIcon} 
            icon="heart"/>
            <span> Favorite</span> 
          </div>
          }
        </div>
        <div className={postLocation}>
          <p>{location}</p>
          <p className={locationLabel}>Location</p>
        </div>
      </div>
    </div>
  );
};

export default Post;