import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { POSTS } from '../../API';
import { backdropContainer, fullSize, 
  absoluteLabel, authorDetails, authorName,
  description, descriptionTop, descriptionTitle, 
  descriptionText, favoriteButton } from '../../style/PostShow.module.css'
import { container } from '../../style/Post.module.css';
import Location from '../presentationals/Location';
import UserAvatar from '../presentationals/UserAvatar';
import Favorite from '../presentationals/Favorite';
import { connect } from 'react-redux';
import { FAVORITE_POSTS } from '../../API';

function Post (props) {
  const { authToken } = props;
  const location = useLocation();
  const [post, setPost] = useState();
  const [author, setAuthor ] = useState();
  const [favorites, setFavorites] = useState();
  const postID = location.state.id;

  useEffect(() => {
    const makeRequest = async() => {
      try {
        const request = await axios.get(`${POSTS}/${postID}`, { headers: 
          { Authorization: `Bearer ${authToken}` } });
        setPost(request.data.data.attributes);
        setAuthor(request.data.included[0].attributes);
        setFavorites(request.data.data.relationships.favorites.data.length);
      }catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);

  const addPostToFavorites =  async () => {
    try {
      const data = { favorite: { post_id: postID } }
      const request = await axios.post(`${FAVORITE_POSTS}`, data, 
        { headers: { Authorization: `Bearer ${authToken}` }});
      setPost((state) => ({...state, favorite: {id: request.data.data.id}}));
      setFavorites((state) => state + 1);
    }catch(error) {
      console.log(error)
    }
  }

  const removePostFromFavorites = async () => {
    try {
      const request = await axios.delete(`${FAVORITE_POSTS}/${post.favorite.id}`, 
        { headers: { Authorization: `Bearer ${authToken}` } });
      console.log(request);
      setPost((state) => ({...state, favorite: null}));
      setFavorites((state) => state - 1);
    }catch(error) {
      console.log(error);
    }
  };

  const handleFavoriteButton = async() => {
    if(post.favorite) removePostFromFavorites();
    else addPostToFavorites();
  };

  const handleButtonText = ()  => {
    if (post.favorite) return 'Remove from favorites';
    else return 'Add to Favorites';
  };

  return (
    <div className={container}>
      {post && author
      &&
      <>
        <div className={backdropContainer}>
          <img className={fullSize} src={post.image}/>
          <div className={absoluteLabel}>
            <div className={authorDetails}>
              <UserAvatar />
              <span className={authorName}>{author.name}</span>
            </div>

            <Location value={post.location}/>

          </div>
        </div>

        <div className={description}>
          <div className={descriptionTop}>
            <h1 className={descriptionTitle}>About this</h1>
              <Favorite inFavorites={post.favorite} counter={favorites} />
          </div>
          <p className={descriptionText}>{post.description}</p>
        </div>
        <button onClick={handleFavoriteButton} type="button" className={favoriteButton} >{handleButtonText()}</button>
      </>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  authToken: state.user.token,
});

export default connect(mapStateToProps)(Post);