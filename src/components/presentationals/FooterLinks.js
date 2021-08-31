import { footLink } from '../../style/Dropdown.module.css';

function FooterLinks(props) {
  const { handleLogOut } = props;

  return (
    <div>
      <p className={footLink}>Help</p>
      <button onClick={handleLogOut} className={footLink} type="button">Log out</button>
    </div>
  );
}

export default FooterLinks;
