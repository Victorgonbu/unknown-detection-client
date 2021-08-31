import { currentPathName } from '../../style/Navbar.module.css';

function NavCurrentPath(props) {
  const { value } = props;

  return (
    <div className={currentPathName}>
      {value}
    </div>
  );
}

export default NavCurrentPath;
