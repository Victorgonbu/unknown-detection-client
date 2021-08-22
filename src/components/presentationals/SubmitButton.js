import { button, field } from '../../style/Forms.module.css';

function SubmitButton(props) {
  const { handleSubmit, text } = props;
  return(
    <div className={field}>
      <button onClick={handleSubmit} type="button" className={button}>{text}</button>
    </div>
  );
};

export default SubmitButton;