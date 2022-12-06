import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Typography, Button, Box} from '@mui/material'
import { ExitToApp } from '@mui/icons-material';
import { RatedCards } from '..';
import {useGetListQuery } from '../../services/TMDB';

import { userSelector } from '../../features/auth';

const Profile = () => {
  const { user } = useSelector(userSelector);
  
  const {data: favoriteMovies, refetch: refetchFavorites} = useGetListQuery({listName:'favorite/movies' , accountId: user.id, sessionId: localStorage.getItem('session_id'), page:1});
  const {data: watchlistMovies, refetch: refetchWatchlisted} = useGetListQuery({listName:'favorite/movies' , accountId: user.id, sessionId: localStorage.getItem('session_id'), page:1})
  
  useEffect(()=>{
    refetchFavorites();
    refetchWatchlisted()
  },[])
  
  
  
  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }
  return (
    <Box>
      
        <Box display='flex' justifyContent= 'space-between'>
          <Typography  gutterBottom variant='h4'>{user.username} Profile</Typography>
            <Button color="inherit" onClick={logout}>Logout &nbsp;<ExitToApp/>
            </Button>
        </Box>
        {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
          ? <Typography variant='h5'>Add favorites or watchlist some movies</Typography> 
            : (<Box>
              <RatedCards title='Favorite Movies' data={favoriteMovies}/>
              <RatedCards title='WatchList' data={watchlistMovies}/>
            </Box>
            )}
        </Box>
        )}


export default Profile