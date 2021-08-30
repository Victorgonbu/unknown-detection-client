import {errors } from '../../style/Forms.module.css';

function AuthErrors (props) {
  const {list} = props
  return(
    <ul className={errors}>
      {list.map((error) => <li>{error}</li>)}
    </ul> 
  );
};

export default AuthErrors;