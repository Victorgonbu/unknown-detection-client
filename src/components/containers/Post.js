import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { POSTS } from '../../API';
import { backdropContainer, fullSize, 
  absoluteLabel, authorDetails, authorName,
  description, descriptionTop, descriptionTitle, descriptionText } from '../../style/PostShow.module.css'
import { container } from '../../style/Post.module.css';
import Location from '../presentationals/Location';
import UserAvatar from '../presentationals/UserAvatar';
import Favorite from '../presentationals/Favorite';
import { connect } from 'react-redux';

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
        console.log(request);
        setPost(request.data.data.attributes);
        setAuthor(request.data.included[0].attributes);
        setFavorites(request.data.data.relationships.favorites.data.length);
      }catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);
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
            { post.favorite
              &&
              <Favorite counter={favorites} />
            }

          </div>
          <p className={descriptionText}>{post.description}</p>
        </div>
      </>
      
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  authToken: state.user.token,
});

export default connect(mapStateToProps)(Post);