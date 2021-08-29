import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { backArrow } from '../../style/Navbar.module.css';

function BackButton () {
  const navigate = useNavigate();

  return(
    <button className={backArrow} onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon="arrow-left" />
    </button>
  );
};

export default BackButton;