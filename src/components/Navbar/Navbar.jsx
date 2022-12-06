
import React, {useContext} from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'
import { useState, useEffect } from 'react';
import {Sidebar, Search} from '..';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
import { ColorModeContext} from '../../utils/ToggleColorMode'

import useStyles from './styles';

const Navbar = () => {
  console.log('navbar')
  const classes = useStyles();
  const isMobile = useMediaQuery ('(max-width:600px)');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const colorMode = useContext(ColorModeContext)
 

  const dispatch = useDispatch();
  const { isAuthenticated, user} = useSelector((userSelector));
  console.log('user', user)

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          console.log(userData)

          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();

          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);

          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
              >
            <Menu
                />
                </IconButton>
                 )}
            <IconButton
              color="inherit"
              sx={{ ml:1}}
              onClick={colorMode.toggleColorMode}
              >
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            {!isMobile && <Search />}
            <div>
            
              {!isAuthenticated ? (
                <Button 
                color='inherit'
                onClick={fetchToken}
                >Login &nbsp; <AccountCircle />

                </Button>
              ):(
                
                <Button
                color='inherit'
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}>
                {!isMobile && <>
                  {user.username} Movies &nbsp;
                </>}               
                <Avatar
                style={{width: 30, height: 30}}
                alt="profile"
                src={user.avatar}
                ></Avatar> 
                <div className={classes.language}>
                  [{user.iso_639_1}]
                </div>
              

                </Button>
              )}
            </div>
            {isMobile && <Search />}

        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
            {isMobile ?(
              <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
               
                classes={{paper:
                  classes.drawerPaper}}
                ModalProps={{ keepMounted: true }}
                >
                  <Sidebar 
                  setMobileOpen={setMobileOpen}
                />
              </Drawer>
            ):(
              <Drawer
              classes={{paper: classes.drawerPaper}}
              variant="permanent"
              open
              >
                <Sidebar
              setMobileOpen={setMobileOpen} />
                
              </Drawer>

            )}

        </nav>
      </div>
    </>
  )
}

export default Navbar;

