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

function SignUp(props) {
  const [values, setValues] = useState({
    name: '', email: '', password: '', password_confirmation: '',
  });
  const { attemptSignUp, currentUser } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) navigate('/posts');
  }, [currentUser]);

  const handleSubmit = () => {
    attemptSignUp(values, SIGNUP, setErrors);
  };

  const handleChange = (e) => {
    setValues((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  return (
    <div className={container}>
      <h1 className={title}>Sign Up</h1>
      <Errors list={errors} />
      <form className={formContainer}>
        <TextField
          variant="outlined"
          value={values.name}
          fullWidth
          id="name"
          label="Name"
          onChange={handleChange}
          className={`${classes.root} ${classes.formControl}`}
        />
        <TextField
          variant="outlined"
          value={values.email}
          fullWidth
          id="email"
          label="Email"
          onChange={handleChange}
          className={`${classes.root} ${classes.formControl}`}
        />

        <FormControl variant="outlined" className={`${classes.formControl} ${classes.root}`}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            value={values.password}
            id="password"
            type="password"
            onChange={handleChange}
            labelWidth={70}
          />
        </FormControl>

        <FormControl variant="outlined" className={`${classes.formControl} ${classes.root}`}>
          <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
          <OutlinedInput
            value={values.password_confirmation}
            id="password_confirmation"
            type="password"
            onChange={handleChange}
            labelWidth={140}
          />
        </FormControl>

        <SubmitButton text="Sign up" handleSubmit={handleSubmit} />

      </form>
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
