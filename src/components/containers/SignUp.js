import {
  TextField, OutlinedInput, FormControl, InputLabel,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticateUser } from '../../actions/index';
import { container, formContainer, title } from '../../style/Forms.module.css';
import SubmitButton from '../presentationals/buttons/Submit';
import { SIGNUP } from '../../API';
import Errors from '../presentationals/Errors';
import useStyles from '../../hooks/useStyles';
import BackButton from '../presentationals/buttons/Back';

function SignUp(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const { attemptSignUp, currentUser } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) navigate('/posts');
  }, [currentUser]);

  const handleSubmit = () => {
    attemptSignUp({
      name,
      email,
      password,
      password_confirmation: passwordConf,
    }, SIGNUP, setErrors);
  };
  return (
    <div className={container}>
      <h1 className={title}>Sign Up</h1>
      <Errors list={errors} />
      <form className={formContainer}>
        <TextField
          variant="outlined"
          value={name}
          fullWidth
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          className={`${classes.root} ${classes.formControl}`}
        />
        <TextField
          variant="outlined"
          value={email}
          fullWidth
          id="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          className={`${classes.root} ${classes.formControl}`}
        />

        <FormControl variant="outlined" className={`${classes.formControl} ${classes.root}`}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            value={password}
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            labelWidth={70}
          />
        </FormControl>

        <FormControl variant="outlined" className={`${classes.formControl} ${classes.root}`}>
          <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
          <OutlinedInput
            value={passwordConf}
            id="password_confirmation"
            type="password"
            onChange={(e) => setPasswordConf(e.target.value)}
            labelWidth={140}
          />
        </FormControl>

        <SubmitButton text="Sign up" handleSubmit={handleSubmit} />

      </form>
      <BackButton />
    </div>
  );
}

SignUp.propTypes = {
  currentUser: PropTypes.string,
  attemptSignUp: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  currentUser: null,
};

const mapStateToProps = (state) => ({
  currentUser: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  attemptSignUp: (data, url, setErrors) => { dispatch(authenticateUser(data, url, setErrors)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
