import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { postFavorite, favoriteIcon } from '../../style/Post.module.css';

function Favorite () {
  return(
    <div className={postFavorite}>
      <FontAwesomeIcon 
      className={favoriteIcon} 
      icon="heart"/>
      <span> Favorite</span> 
    </div>
  );
};

export default Favorite;