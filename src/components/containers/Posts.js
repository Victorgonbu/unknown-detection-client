import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  container, carouselContainer,
  carouselItem, carouselDots,
} from '../../style/Post.module.css';
import Post from '../presentationals/Post';
import Errors from '../presentationals/Errors';
import { getPosts, setCurrentPathName } from '../../actions/index';

function Posts(props) {
  const {
    getPosts, allPosts, username,
    favoriteOnly, setCurrentPathName,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const [errors, setErrors] = useState([]);

  const responsive = {
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1.2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
  };

  useEffect(() => {
    if (!search) {
      if (favoriteOnly) {
        if (!username) navigate('/login');
        else {
          setCurrentPathName('Favorites');
          getPosts('favorite', setErrors);
        }
      } else {
        setCurrentPathName('Unknown Detections');
        getPosts('all', setErrors);
      }
    } else {
      const query = search.split('?')[1].replaceAll('%20', ' ');
      setCurrentPathName(`"${query}"`);
      getPosts('search', setErrors, query);
    }
    return () => {
      setErrors([]);
    };
  }, [username, favoriteOnly, search]);

  return (
    <div className={container}>
      <Errors list={errors} />

      {allPosts
      && (
      <Carousel
        responsive={responsive}
        deviceType="mobile"
        removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
        itemClass={carouselItem}
        containerClass={carouselContainer}
        dotListClass={carouselDots}
        swipeable
        draggable
        showDots
        focusOnSelect
        additionalTransfrom={10}
      >
        { allPosts.map((post) => (
          <Post
            key={post.id}
            title={post.attributes.title}
            imageUrl={post.attributes.image}
            description={post.attributes.description}
            location={post.attributes.location}
            favorite={post.attributes.favorite}
            id={post.id}
          />
        )) }
      </Carousel>
      )}

    </div>
  );
}

Posts.propTypes = {
  allPosts: PropTypes.arrayOf(PropTypes.object),
  username: PropTypes.string,
  getPosts: PropTypes.func.isRequired,
  setCurrentPathName: PropTypes.func.isRequired,
  favoriteOnly: PropTypes.bool,
};

Posts.defaultProps = {
  allPosts: null,
  username: null,
  favoriteOnly: false,
};

const mapStateToProps = (state) => ({
  allPosts: state.posts.all,
  username: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: (type, query, setErrors) => { dispatch(getPosts(type, query, setErrors)); },
  setCurrentPathName: (name) => { dispatch(setCurrentPathName(name)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
