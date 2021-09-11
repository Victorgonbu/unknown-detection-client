import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& label.Mui-focused': {
      color: 'gray',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#ff6026',
      },
    },
  },
  formControl: {
    marginTop: '1em',
    width: '30ch',
  },
}));

export default useStyles;
