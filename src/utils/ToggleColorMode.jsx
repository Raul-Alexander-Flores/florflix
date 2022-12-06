import React, { useState, createContext, useMemo } from 'react'
import { ThemeProvider, createTheme} from '@mui/material/styles'


export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {

    const toggleColorMode = ()=>{
        setMode ((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }
    const [mode, setMode] = useState('light');

    const theme = useMemo(()=> createTheme({
        palette:{
            mode,
            primary: {
                main: '#ADD8E6',
              },
            

        },

    }), [mode]);

  return (
   <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode}}>

        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
   </ColorModeContext.Provider>
  )
}

export default ToggleColorMode