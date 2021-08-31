import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { POSTS, FAVORITE_POSTS } from '../../API';
import {
  backdropContainer, fullSize,
  absoluteLabel, authorDetails, authorName,
  description, descriptionTop, descriptionTitle,
  descriptionText, favoriteButton,
} from '../../style/PostShow.module.css';
import { container } from '../../style/Post.module.css';
import Location from '../presentationals/Location';
import UserAvatar from '../presentationals/UserAvatar';
import Favorite from '../presentationals/Favorite';
import { setCurrentPathName } from '../../actions/index';
import Errors from '../presentationals/Errors';

function Post(props) {
  const { authToken, setCurrentPathName } = props;
  const location = useLocation();
  const [post, setPost] = useState();
  const [author, setAuthor] = useState();
  const [favorites, setFavorites] = useState();
  const postID = location.state.id;
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const request = await axios.get(`${POSTS}/${postID}`, {
          headers:
          { Authorization: `Bearer ${authToken}` },
        });
        setCurrentPathName(request.data.data.attributes.title);
        setPost(request.data.data.attributes);
        setAuthor(request.data.included[0].attributes);
        setFavorites(request.data.data.relationships.favorites.data.length);
      } catch {
        setErrors(['Unable to fetch Post']);
      }
    };

    makeRequest();
  }, []);

  const addPostToFavorites = async () => {
    try {
      const data = { favorite: { post_id: postID } };
      const request = await axios.post(`${FAVORITE_POSTS}`, data,
        { headers: { Authorization: `Bearer ${authToken}` } });
      setPost((state) => ({ ...state, favorite: { id: request.data.data.id } }));
    } catch {
      setErrors(['Unable to Add post to favorites']);
      setPost((state) => ({ ...state, favorite: null }));
      setFavorites((state) => state - 1);
    }
  };

  const removePostFromFavorites = async () => {
    try {
      await axios.delete(`${FAVORITE_POSTS}/${post.favorite.id}`,
        { headers: { Authorization: `Bearer ${authToken}` } });
    } catch {
      setErrors(['Unable to remove post from favorites']);
      setPost((state) => ({ ...state, favorite: { id: null } }));
      setFavorites((state) => state + 1);
    }
  };

  const handleFavoriteButton = async () => {
    if (post.favorite) {
      setPost((state) => ({ ...state, favorite: null }));
      setFavorites((state) => state - 1);
      removePostFromFavorites();
    } else {
      setPost((state) => ({ ...state, favorite: { id: null } }));
      setFavorites((state) => state + 1);
      addPostToFavorites();
    }
  };

  const handleButtonText = () => {
    if (post.favorite) return 'Remove from favorites';
    return 'Add to Favorites';
  };

  return (
    <div className={container}>
      <Errors list={errors} />
      {post && author
      && (
      <>
        <div className={backdropContainer}>
          <img alt="Post backdrop" className={fullSize} src={post.image} />
          <div className={absoluteLabel}>
            <div className={authorDetails}>
              <UserAvatar />
              <span className={authorName}>{author.name}</span>
            </div>

            <Location value={post.location} />

          </div>
        </div>

        <div className={description}>
          <div className={descriptionTop}>
            <h1 className={descriptionTitle}>About this</h1>
            <Favorite inFavorites={post.favorite} counter={favorites} />
          </div>
          <p className={descriptionText}>{post.description}</p>
        </div>
        {authToken
          && <button onClick={handleFavoriteButton} type="button" className={favoriteButton}>{handleButtonText()}</button>}
      </>
      )}
    </div>
  );
}

Post.propTypes = {
  authToken: PropTypes.string,
  setCurrentPathName: PropTypes.func.isRequired,
};

Post.defaultProps = {
  authToken: null,
};

const mapStateToProps = (state) => ({
  authToken: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentPathName: (name) => { dispatch(setCurrentPathName(name)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
