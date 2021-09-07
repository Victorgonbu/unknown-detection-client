import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  backdropContainer, fullSize,
  absoluteLabel, authorDetails, authorName,
} from '../../style/PostShow.module.css';
import { container } from '../../style/Post.module.css';
import Location from '../presentationals/Location';
import UserAvatar from '../presentationals/UserAvatar';
import {
  removePostFromFavorites,
  addPostToFavorites, setPostAttributes, getPost,
} from '../../actions/index';
import Errors from '../presentationals/Errors';
import Description from '../presentationals/Description';
import AddFavoriteButton from '../presentationals/buttons/AddFavorite';

function Post(props) {
  const {
    authToken, setPostAttributes,
    removePostFromFavorites, addPostToFavorites, post,
    postAuthor, postFavorites, getPost,
  } = props;
  const location = useLocation();
  const postID = location.state.id;
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getPost(postID, authToken, setErrors);
    return () => {
      setPostAttributes('SET_CURRENT_POST', null);
    };
  }, []);

  const handleFavoriteButton = () => {
    if (post.favorite) {
      removePostFromFavorites(authToken, setErrors);
      setPostAttributes('SET_CURRENT_FAVORITE', null);
      setPostAttributes('UPDATE_FAVORITES_COUNTER', -1);
    } else {
      addPostToFavorites(postID, authToken, setErrors);
      setPostAttributes('SET_CURRENT_FAVORITE', { id: '' });
      setPostAttributes('UPDATE_FAVORITES_COUNTER', 1);
    }
  };

  const handleButtonText = () => {
    if (post.favorite) return 'Remove from Favorites';
    return 'Add to Favorites';
  };

  return (
    <div className={container}>
      <Errors list={errors} />
      {post && postAuthor
      && (
      <>
        <div className={backdropContainer}>
          <img alt="Post backdrop" className={fullSize} src={post.image} />
          <div className={absoluteLabel}>
            <div className={authorDetails}>
              <UserAvatar />
              <span className={authorName}>{postAuthor.name}</span>
            </div>

            <Location value={post.location} />

          </div>
        </div>

        <Description text={post.description} favorite={post.favorite} favCounter={postFavorites} />

        {authToken
        && <AddFavoriteButton handleClick={handleFavoriteButton} text={handleButtonText()} />}
      </>
      )}
    </div>
  );
}

Post.propTypes = {
  authToken: PropTypes.string,
  addPostToFavorites: PropTypes.func.isRequired,
  removePostFromFavorites: PropTypes.func.isRequired,
  setPostAttributes: PropTypes.func.isRequired,
  post: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ])),
  postAuthor: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])),
  postFavorites: PropTypes.number,
  getPost: PropTypes.func.isRequired,
};

Post.defaultProps = {
  authToken: null,
  post: null,
  postAuthor: null,
  postFavorites: null,
};

const mapStateToProps = (state) => ({
  authToken: state.user.token,
  post: state.posts.current,
  postAuthor: state.posts.author,
  postFavorites: state.posts.favoritesCounter,
});

const mapDispatchToProps = (dispatch) => ({
  addPostToFavorites: (postID, token, setErrors) => {
    dispatch(
      addPostToFavorites(postID, token, setErrors),
    );
  },
  removePostFromFavorites: (token, setErrors) => {
    dispatch(removePostFromFavorites(token, setErrors));
  },
  setPostAttributes: (attr, payload) => { dispatch(setPostAttributes(attr, payload)); },
  getPost: (postID, token, setErrors) => { dispatch(getPost(postID, token, setErrors)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
