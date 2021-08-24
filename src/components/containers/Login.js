import { title, field, container, formContainer } from '../../style/Forms.module.css';
import { TextField, FormControl, Input, InputLabel, 
        InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import SubmitButton from '../presentationals/SubmitButton';
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/index';
import { LOGIN } from '../../API';
import { useNavigate } from 'react-router-dom';

const styles = {
  formControl: {
    marginTop: '1em',
  }
}

function Login(props) {
  const { classes, attemptLogin, username } = props;
  const [values, setValues] = useState({email: '', password: ''});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(username) navigate('/posts')
  }, [username]);

  const handleChange = (e) => {
    setValues((state) => ({
      ...state, [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = () => {
      attemptLogin(values, LOGIN);
  };

  return(
    <div className={container}>
      <h1 className={title}>Log In</h1>
      <form className={formContainer}>
        <div className={field}>
          <TextField 
          fullWidth id="email" 
          label="Email"
          onChange={handleChange}
          />
        </div>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input 
            value={values.password}
            id="password"
            type={showPassword ?  'text':'password'}
            onChange={handleChange}
            endAdornment={
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((state) => !state)}
                >
                  {showPassword ? <Visibility />:<VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <SubmitButton text="Login" handleSubmit={handleSubmit}/>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (data, url) => {dispatch(authenticateUser(data, url))}
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));