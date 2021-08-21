import { TextField, Input, FormControl, InputLabel } from '@material-ui/core'
import { signup, signupForm, field, button, title } from '../../style/Forms.module.css';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { signUp } from '../../actions/index';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const styles = {
  formControl: {
    marginTop: '1em',
  }
}

function SignUp(props) {
  const [values, setValues] = useState({name: '', email: '', password: '', password_confirmation: ''});
  const { classes, attemptSignUp, currentUser } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if(currentUser) navigate('/');
  }, [currentUser]);

  const handleSubmit =() => {
    attemptSignUp(values)
  };

  const handleChange = (e) => {
    setValues((state) => {

      return {...state, [e.target.id]: e.target.value}
    });
  };
  
  return(
    <div className={signup}>
      <h1 className={title}>Sign Up</h1>
      <form className={signupForm}>
        <div className={field}>
         <TextField 
         value={values.name}
         fullWidth 
         id="name" 
         label="Name"
         onChange={handleChange}
         />
        </div> 
        <div className={field}>
          <TextField
          value={values.email}
          fullWidth 
          id="email" 
          label="Email"
          onChange={handleChange}
          />
        </div>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input 
            value={values.password}
            id="password"
            type="password"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth className={classes.formControl} >
          <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
          <Input 
            value={values.password_confirmation}
            id="password_confirmation"
            type="password"
            onChange={handleChange}
          />
        </FormControl>

        <div className={field}>
          <button onClick={handleSubmit} type="button" className={button}>Sign Up</button>
        </div>
        
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.name
});

const mapDispatchToProps = (dispatch) => ({
  attemptSignUp: (data) => {dispatch(signUp(data))}
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));