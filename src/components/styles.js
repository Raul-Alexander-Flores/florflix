import { makeStyles } from '@mui/styles';
import { height } from '@mui/system';

export default makeStyles(() => ({

  root: {
    display: 'flex',
    height: '100%',
  },

  toolbar: {
    height: '80px',

  },

  content: {
    flexGrow: 1,
    padding: '2em',
    width: '100%',

  },

}));
