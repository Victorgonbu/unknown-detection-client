import { footLink } from '../../style/Dropdown.module.css';
import PropTypes from 'prop-types';

function FooterLinks(props) {
  const { handleLogOut } = props;

  return (
    <div>
      <p className={footLink}>Help</p>
      <button onClick={handleLogOut} className={footLink} type="button">Log out</button>
    </div>
  );
}

FooterLinks.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
};

export default FooterLinks;
