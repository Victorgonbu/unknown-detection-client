import PropTypes from 'prop-types';
import { errors } from '../../style/Forms.module.css';

function Errors(props) {
  const { list } = props;
  return (
    <ul className={errors}>
      {list.map((error) => <li key={error}>{error}</li>)}
    </ul>
  );
}

Errors.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

Errors.defaultProps = {
  list: [],
};

export default Errors;
