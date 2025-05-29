import { OutlinedInput, OutlinedInputProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  boxShadow: `0 0 1px ${theme.palette.primary.main}66`, 
  color: theme.palette.primary.main, 
  height: '38px', 
  width: '100%',
  maxWidth: '600px',
  borderRadius: '5px',
  caretColor: theme.palette.primary.main,
  '& .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${theme.palette.primary.main}66` 
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main 
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: `2px solid ${theme.palette.primary.main}`
  },
  '& input': {
    padding: '8px 16px' 
  }
}))

const CustomOutlinedInput: React.FC<OutlinedInputProps> = ({ sx, ...rest }) => {
  return <StyledOutlinedInput sx={sx} {...rest} />
}


export default CustomOutlinedInput
