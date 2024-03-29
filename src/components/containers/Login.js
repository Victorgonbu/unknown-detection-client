import {
  TextField, FormControl, OutlinedInput, InputLabel,
  InputAdornment, IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SubmitButton from '../presentationals/buttons/Submit';
import { authenticateUser } from '../../actions/index';
import { LOGIN } from '../../API';
import { title, container, formContainer } from '../../style/Forms.module.css';
import Errors from '../presentationals/Errors';
import useStyles from '../../hooks/useStyles';
import BackButton from '../presentationals/buttons/Back';

function Login(props) {
  const { attemptLogin, username } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (username) navigate('/posts');
  }, [username]);

  const handleSubmit = () => {
    attemptLogin({ email, password }, LOGIN, setErrors);
  };

  return (
    <div className={container}>
      <h1 className={title}>Log In</h1>
      <Errors list={errors} />
      <form className={formContainer}>

        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          className={`${classes.root} ${classes.formControl}`}
        />

        <FormControl variant="outlined" className={`${classes.formControl} ${classes.root}`}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            value={password}
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            labelWidth={70}
            endAdornment={(
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((state) => !state)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>

        <SubmitButton text="Login" handleSubmit={handleSubmit} />
      </form>
      <BackButton />
    </div>
  );
}

Login.propTypes = {
  username: PropTypes.string,
  attemptLogin: PropTypes.func.isRequired,
};

Login.defaultProps = {
  username: null,
};

const mapStateToProps = (state) => ({
  username: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (data, url, setErrors) => { dispatch(authenticateUser(data, url, setErrors)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
