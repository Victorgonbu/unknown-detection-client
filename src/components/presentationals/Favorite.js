import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { postFavorite, favoriteIcon, favoriteCounter } from '../../style/Post.module.css';

function Favorite (props) {
  const { withLabel, counter } = props;
  return(
    <div className={postFavorite}>
      <FontAwesomeIcon 
      className={favoriteIcon} 
      icon="heart"/>
      {
        withLabel &&
        <span> Favorite</span> 
      }

      { counter &&
        <span className={favoriteCounter}>{counter}</span>
      }
      
    </div>
  );
};

export default Favorite;