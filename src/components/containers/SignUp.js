import { TextField, Input, FormControl, InputLabel } from '@material-ui/core'
import { signup, signupForm, field, button, title } from '../../style/Forms.module.css';
import { useState } from 'react';

function SignUp() {
  const [showPass, setShowPass] = useState();
  const [values, setValues] = useState({name: '', email: '', password: '', password_confirmation: ''});
  
  const handleChange = (e) => {
    console.log(e)
  };
  
  return(
    <div className={signup}>
      <h1 className={title}>Sign Up</h1>
      <form className={signupForm}>
        <div className={field}>
         <TextField fullWidth id="name" label="Name"/>
        </div> 
        <div className={field}>
          <TextField fullWidth id="email" label="Email"/>
        </div>
        <FormControl fullWidth >
          <InputLabel htmlFor="password-field">Password</InputLabel>
          <Input 
            id="password-field"
            type="password"
            onChange={handleChange}
          />
        </FormControl>

        <div className={field}>
          <button type="button" className={button}>Sign Up</button>
        </div>
        
      </form>
    </div>
  );
};;

export default SignUp;