import React, { useRef} from 'react';

import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import { Navbar, Movies, Actors, Profile, MovieInfo } from './index';
import useStyles from './styles';
import useAlan from './Alan';

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();

  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/movie/:id">
            <MovieInfo />
          </Route>
          <Route exact path="/actors/:id">
            <Actors />
            </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/">
            <Movies />
          </Route>

        </Switch>
        
      </main>
      <div ref={alanBtnContainer}/>
    </div>
  )
}

export default App


