import { post, postTitle, postImage, postLocation, postInfo } from '../../style/Post.module.css';

function Post (props) {
  const {imageUrl, title, location} = props;
  return(
    <div className={post}>
      <img className={postImage} src={imageUrl} />
      <div className={postInfo}>
        <p className={postTitle}>{title}</p>
        <div className={postLocation}>
          <p>{location}</p>
          <p>Location</p>
        </div>
      </div>
    </div>
  );
};

export default Post;