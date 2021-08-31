import PropTypes from 'prop-types';
import { currentPathName } from '../../style/Navbar.module.css';

function NavCurrentPath(props) {
  const { value } = props;

  return (
    <div className={currentPathName}>
      {value}
    </div>
  );
}

NavCurrentPath.propTypes = {
  value: PropTypes.string.isRequired,
};

export default NavCurrentPath;
