import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { container, post } from '../../style/Post.module.css';

function Posts (props) {
  const { getPosts } = props;

  const responsive = {
    mobile: {
      breakpoint : { max: 400, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    getPosts();
  },[]);

  return(
    <div className={container}>
      <Carousel 
      responsive={responsive}
      deviceType="mobile"
      >
        <div className={post}></div>
        <div className={post}></div>
      </Carousel>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => {dispatch(getAllPosts());},
});

export default connect(null, mapDispatchToProps)(Posts);