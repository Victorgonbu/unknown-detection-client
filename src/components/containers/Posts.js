import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { container, carouselContainer, 
  carouselItem, carouselDots } from '../../style/Post.module.css';
import Post from '../presentationals/Post';

function Posts (props) {
  const { getPosts, allPosts, username,
    favoriteOnly, } = props;
    console.log(allPosts)
  const responsive = {
    mobile: {
      breakpoint : { max: 400, min: 0 },
      items: 1.2
    }
  };

  useEffect(() => {
    if (favoriteOnly) getPosts('favorite');
    else getPosts('all'); 
  },[username, favoriteOnly]);

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
                                      favorite={post.attributes.favorite}
                                      id={post.id}
                                    />)) }
      </Carousel>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  allPosts: state.posts.all,
  username: state.user.name
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: (type) => {dispatch(getPosts(type));},
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);