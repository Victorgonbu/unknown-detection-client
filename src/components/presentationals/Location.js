import { postLocation, locationLabel } from '../../style/Post.module.css';
import PropTypes from 'prop-types';

function Location(props) {
  const { value } = props;
  return (
    <div className={postLocation}>
      <p>{value}</p>
      <p className={locationLabel}>Location</p>
    </div>
  );
}

Location.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Location;
