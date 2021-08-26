import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { container, carouselContainer, 
  carouselItem, carouselDots } from '../../style/Post.module.css';
import Post from '../presentationals/Post';

function Posts (props) {
  const { getPosts, allPosts } = props;

  const responsive = {
    mobile: {
      breakpoint : { max: 400, min: 0 },
      items: 1.2
    }
  };

  useEffect(() => {
    getPosts();
  },[]);

  console.log(allPosts);

  return(
    <div className={container}>
      {allPosts 
      &&
      <Carousel 
        responsive={responsive}
        deviceType="mobile"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass={carouselItem}
        containerClass={carouselContainer}
        dotListClass={carouselDots}
        swipeable={true}
        draggable={true}
        showDots={true}
        focusOnSelect={true}
      >
        { allPosts.map((post) =>  (<Post 
                                      title={post.attributes.title}
                                      imageUrl={post.attributes.image}
                                      description={post.attributes.description}
                                      location={post.attributes.location}
                                    />)) }
      </Carousel>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  allPosts: state.posts.all
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => {dispatch(getAllPosts());},
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);