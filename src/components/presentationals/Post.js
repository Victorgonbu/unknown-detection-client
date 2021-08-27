import { post, postTitle, postImage, 
  postInfo, titleFavorite } from '../../style/Post.module.css';
import { useNavigate } from 'react-router-dom';
import Location from './Location';
import Favorite from './Favorite';

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
          <Favorite withLabel inFavorites={favorite} />
          }
        </div>
        <Location value={location}/>
      </div>
    </div>
  );
};

export default Post;