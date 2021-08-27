import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { POSTS } from '../../API';
import { backdropContainer, fullSize, 
  absoluteLabel, authorDetails, authorName,
  description, descriptionTitle, descriptionText } from '../../style/PostShow.module.css'
import { container } from '../../style/Post.module.css';
import Location from '../presentationals/Location';
import UserAvatar from '../presentationals/UserAvatar';

function Post () {
  const location = useLocation();
  const [post, setPost] = useState();
  const [author, setAuthor ] = useState();
  const postID = location.state.id;

  useEffect(() => {
    const makeRequest = async() => {
      try {
        
        const request = await axios.get(`${POSTS}/${postID}`);
        console.log(request);
        setPost(request.data.data.attributes);
        setAuthor(request.data.included[0].attributes);
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
          <span className={descriptionTitle}>About this</span>
          <p className={descriptionText}>{post.description}</p>
        </div>
      </>
      
      }
    </div>
  );
};

export default Post;