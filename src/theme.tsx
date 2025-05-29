import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#F7F7F7'
        },
        secondary: {
          main: '#6C63FF'
        },
        error: {
          main: red.A400
        }
      }
    },
    light: {
      palette: {
        primary: {
          main: '#6C63FF'
        },
        secondary: {
          main: '#6C63FF'
        },
        error: {
          main: red.A400
        }
      }
    }
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          boxShadow: '0 0 1px #6C63FF66', 
          color: '#6C63FF',
          height: '38px', 
          borderRadius: '5px',
          caretColor: '#6C63FF',
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid rgba(108, 99, 255, 0.4)'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6C63FF'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #6C63FF'
          }
        },
        input: {
          padding: '8px 16px'
        }
      }
    }
  }
})

export default theme
