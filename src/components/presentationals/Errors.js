import { errors } from '../../style/Forms.module.css';

function Errors(props) {
  const { list } = props;
  return (
    <ul className={errors}>
      {list.map((error) => <li key={error}>{error}</li>)}
    </ul>
  );
}

export default Errors;
