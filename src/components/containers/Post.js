import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { POSTS } from '../../API';
import { backdropContainer, absoluteFullSize } from '../../style/PostShow.module.css'
import { container } from '../../style/Post.module.css';

function Post () {
  const location = useLocation();
  const [post, setPost] = useState();
  const postID = location.state.id;

  useEffect(() => {
    const makeRequest = async() => {
      try {
        const request = await axios.get(`${POSTS}/${postID}`);
        setPost(request.data.data);
      }catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);
  return (
    <div className={container}>
      {post
      &&
      <div className={backdropContainer}>
        <img className={absoluteFullSize} src={post.attributes.image}/>        
      </div>
      }
    </div>
  );
};

export default Post;