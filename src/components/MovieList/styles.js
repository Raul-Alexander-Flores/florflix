import { makeStyles } from '@mui/styles';
import { height } from '@mui/system';

export default makeStyles((theme) => ({

  moviesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      overflow: 'auto',
      [theme.breakpoints.down('sm')]: {
          justifyContent: 'center',
      },
    }, 


}));
