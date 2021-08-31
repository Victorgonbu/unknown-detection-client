import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { navButton } from '../../../style/Navbar.module.css';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button type="button" className={navButton} onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon="arrow-left" />
    </button>
  );
}

export default BackButton;
