import { button, submitField } from '../../../style/Forms.module.css';
import PropTypes from 'prop-types';

function SubmitButton(props) {
  const { handleSubmit, text } = props;
  return (
    <div className={submitField}>
      <button onClick={handleSubmit} type="button" className={button}>{text}</button>
    </div>
  );
}

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default SubmitButton;
