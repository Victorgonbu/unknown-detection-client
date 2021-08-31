import { errors } from '../../style/Forms.module.css';
import PropTypes from 'prop-types';

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

Error.defaultProps = {
  list: [],
};

export default Errors;
